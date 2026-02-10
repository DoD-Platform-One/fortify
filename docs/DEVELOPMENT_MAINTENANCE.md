# Development & Maintenance

## Files that require BigBang integration testing

There are certain integrations within the BigBang ecosystem and this package that require additional testing outside of the specific package tests ran during CI. This is a requirement when files within those integrations are changed, as to avoid causing breaks up through the BigBang umbrella. Currently, these include changes to the BigBang templates (see: [bigbang templates](/chart/templates/bigbang/)).

Be aware that any changes to files listed in the [Modifications made to upstream chart](#modifications-made-to-upstream-chart) section will also require a codeowner to validate the changes to ensure that they do not affect the package or its integrations adversely.

### Table of Contents

- [Passthrough Pattern Architecture](#passthrough-pattern-architecture)
- [Testing a new Fortify version](#testing-a-new-fortify-version)
- [Upgrading the package chart](#how-to-upgrade-the-fortify-package-chart)
- [Modifications made to the upstream chart](#modifications-made-to-upstream-chart)

## Passthrough Pattern Architecture

As of version 25.2.2-bb.0, Fortify uses a **passthrough pattern** where the upstream `helm-ssc` chart is included as a subchart with minimal modifications. BigBang-specific features (Istio, NetworkPolicies, monitoring) are added via separate templates in `chart/templates/bigbang/` using the `bb-common` library chart (gluon).

### Chart Structure

```
chart/
  Chart.yaml              # Dependencies: helm-ssc (alias: upstream), mysql, gluon
  values.yaml             # upstream: section + BigBang-specific values
  templates/
    bigbang/              # bb-common Istio, NetworkPolicies, AuthorizationPolicies
    tests/                # Cypress test templates
    keystore-job.yaml     # Pre-install/pre-upgrade keystore generation Job
    _helpers.tpl          # Helper functions
```

### Dependencies

```yaml
dependencies:
  - name: helm-ssc
    version: "25.2.2-1"
    repository: oci://registry-1.docker.io/fortifydocker
    alias: upstream
  - name: mysql
    version: 9.19.0
    repository: oci://registry-1.docker.io/bitnamicharts
  - name: gluon
    version: "0.5.20"
    repository: oci://registry1.dso.mil/bigbang
```

### Values Structure

The `values.yaml` has two main sections:

1. **`upstream:` section** - Passed through to the upstream helm-ssc subchart
   ```yaml
   upstream:
     image:
       repository: "registry1.dso.mil/ironbank/microfocus/fortify/ssc"
       tag: "25.4.0.0137"
     nameOverride: "fortify-ssc"
     fullnameOverride: "fortify-ssc"
     user:
       gid: 1111  # Non-root group for OpenShift/DoD compliance
   ```

2. **Root level** - BigBang-specific values (NOT passed to upstream)
   - `keystoreJob:` - Keystore generation Job configuration
   - `mysql:` - MySQL subchart configuration
   - `istio:`, `networkPolicies:`, `routes:` - bb-common integrations
   - `fortify_autoconfig:`, `fortify_license:` - Content for secrets
   - `bbtests:` - Cypress test configuration

## Testing a new Fortify version

1. Create a k8s dev environment using the Big Bang [k3d-dev.sh](https://repo1.dso.mil/big-bang/bigbang/-/tree/master/docs/reference/scripts/developer) script. Use the `-b` flag for the big instance (m5a.4xlarge, 16 CPU) since Fortify + MySQL requires significant resources.

1. Follow the instructions at the end of the script to connect to the k8s cluster and install flux.

1. Use the following override example to deploy. We currently do not test using a fortify license, however if one becomes available it can be set in `addons.fortify.values.fortify_license`.

    ```yaml
    addons:
      fortify:
        enabled: true
        sourceType: "git"
        git:
          repo: "https://repo1.dso.mil/big-bang/product/packages/fortify.git"
          tag: null
          branch: "replace-me-with-your-branch-name"
        values:
          networkPolicies:
            enabled: true
          mysql:
            enabled: true
          fortify_autoconfig: |
              appProperties:
                host.validation: false
              datasourceProperties:
                db.username: root
                db.password: password
                jdbc.url: 'jdbc:mysql://fortify-mysql:3306/ssc_db?sessionVariables=collation_connection=latin1_general_cs&rewriteBatchedStatements=true'
              dbMigrationProperties:
                migration.enabled: true
                migration.username: root
                migration.password: password
    ```

1. Access Fortify UI from a browser (usually `fortify.dev.bigbang.mil`) and login with the default credentials:

    - Username: `admin`
    - Password: `admin`

## How to upgrade the Fortify Package chart

Notes:
- This is the Fortify Software Security Center (SSC). See the [official Fortify SSC documentation](https://www.microfocus.com/documentation/fortify-software-security-center/).
- The current source for Fortify helm charts is [fortifydocker/helm-ssc](https://hub.docker.com/r/fortifydocker/helm-ssc)
- In the context of this document and repo, Fortify and Fortify SSC are used interchangeably.

---

1. Review the upstream release notes to understand changes. Note any manual upgrade steps.

1. Update the upstream chart dependency version in [`chart/Chart.yaml`](/chart/Chart.yaml):
   ```yaml
   dependencies:
     - name: helm-ssc
       version: "NEW_VERSION"
   ```

1. Update chart dependencies:
    ```bash
    helm dependency update ./chart
    ```

1. In [`chart/values.yaml`](/chart/values.yaml) update `upstream.image.tag` to the new version:
   ```yaml
   upstream:
     image:
       tag: "NEW_VERSION"
   ```

1. Update [`chart/Chart.yaml`](/chart/Chart.yaml) versions and annotations:
    ```yaml
    version: X.X.X-bb.X
    appVersion: X.X.X.X
    annotations:
      bigbang.dev/applicationVersions: |
        - Fortify: X.X.X.X
    ```

1. Update `annotations."helm.sh/images"` in Chart.yaml if image references changed.

1. Update [`CHANGELOG.md`](/CHANGELOG.md) with an entry for the upgrade.

1. Update [`README.md`](/README.md) following the [gluon library script](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md).

1. Test deployment: clean install and upgrade from previous version. See [Testing a new Fortify version](#testing-a-new-fortify-version).

## Modifications made to upstream chart

None. The upstream `helm-ssc` chart is included as an unmodified subchart (passthrough pattern). All BigBang customizations are applied via values and additional templates.

### BigBang additions

**Templates** (`chart/templates/`):

| Template | Purpose |
|----------|---------|
| `bigbang/*.yaml` | bb-common generated Istio VirtualService, NetworkPolicies, PeerAuthentication, AuthorizationPolicies, ServiceEntries, Sidecar |
| `keystore-job.yaml` | Pre-install/pre-upgrade Job to generate JKS keystore and create secrets |
| `tests/` | Cypress test ConfigMap and Pod for CI validation |
| `_helpers.tpl` | Helper functions for BigBang templates |

**Values** (root level, not passed to upstream):

| Value | Purpose |
|-------|---------|
| `keystoreJob` | Keystore generation Job configuration (image, passwords, resources) |
| `mysql` | Bitnami MySQL subchart for database backend |
| `istio` | Istio service mesh integration (mTLS, sidecar, authorization policies) |
| `routes` | bb-common inbound/outbound route definitions |
| `networkPolicies` | bb-common network policy definitions with egress rules |
| `bbtests` | Cypress test configuration (URL, credentials, resources) |
| `fortify_autoconfig` | SSC autoconfig content (database, thread settings) |
| `fortify_license` | Fortify license content |

### automountServiceAccountToken

The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads).

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.
