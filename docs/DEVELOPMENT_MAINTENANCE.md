# Files that require bigbang integration testing

## See [bb MR testing](./docs/test-package-against-bb.md) for details regarding testing changes against bigbang umbrella chart

There are certain integrations within the bigbang ecosystem and this package that require additional testing outside of the specific package tests ran during CI.  This is a requirement when files within those integrations are changed, as to avoid causing breaks up through the bigbang umbrella.  Currently, these include changes to the istio implementation within fortify (see: [istio templates](/chart/templates/bigbang/istio/), [network policy templates](/chart/templates/bigbang/networkpolicies/), [service entry templates](/chart/templates/bigbang/serviceentries/)).

Be aware that any changes to files listed in the [Modifications made to upstream chart](#modifications-made-to-upstream-chart) section will also require a codeowner to validate the changes using above method, to ensure that they do not affect the package or its integrations adversely.

Be sure to also test against monitoring locally as it is integrated by default with these high-impact service control packages, and needs to be validated using the necessary chart values beneath `istio.hardened` block with `monitoring.enabled` set to true as part of your dev-overrides.yaml

### Table of Contents

- [Testing a new Fortify version](#testing-a-new-fortify-version)
- [Upgrading the package chart](#how-to-upgrade-the-fortify-package-chart)
- [Modifications made to the upstream chart](#modifications-made-to-upstream-chart)

## Testing a new Fortify version

1. Create a k8s dev environment. One option is to use the Big Bang [k3d-dev.sh](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/tree/master/docs/developer/scripts) with no arguments which will give you the default configuration. The following steps assume you are using the script.
1. Follow the instructions at the end of the script to connect to the k8s cluster and install flux.
1. Download the test license using the following command

```bash
aws s3 cp s3://bb-licenses/fortify.license
```

1. Deploy Fortify with these dev values overrides. Core apps are disabled for quick deployment. Be sure to copy the contents of the `fortify.license` file and set it in the `addons.fortify.values.fortify_license` value.

    ```yaml
    addons:
      fortify:
        enabled: true
        sourceType: "git"
        git:
          repo: "https://repo1.dso.mil/big-bang/product/packages/fortify.git"
          path: "chart"
          tag: null
          branch: "replace-me-with-your-branch-name"
        values:
          networkPolicies:
            enabled: true
          mysql:
            enabled: true
          databaseSecret:
            useRoot: true
          # A valid license is required for autoconfig to work
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
          fortify_license: |
            <paste the contents of fortify.license here>
    ```

1. Access Fortify UI from a browser (usually fortify.dev.bigbang.mil, or whatever you added to your hosts file ) and login with the following default credentials:

- Username: `admin`
- Password: `admin`

## How to upgrade the Fortify Package chart

BigBang makes modifications to the upstream helm chart. The full list of changes can be found in the [Modifications made to the upstream chart](#modifications-made-to-upstream-chart) section.

Notes:

- This is the Fortify Software Security Center (SSC). You can find additional info on [the official Fortify SSC documentation](https://www.microfocus.com/documentation/fortify-software-security-center/).

- The current source for Fortify helm charts is [fortifydocker/helm-ssc](https://hub.docker.com/r/fortifydocker/helm-ssc)
- Deprecated helm charts can be found in the [Fortify Helm Chart Github](https://github.com/fortify/helm3-charts/releases?q=ssc&expanded=true) page

- In the context of this document and repo Fortify and Fortify SSC are often used interchangeably.

---

1. Find the current and latest release notes from the [documentation](https://www.microfocus.com/documentation/fortify-software-security-center/). Review the release notes to understand the new changes in the latest version. Take note of any manual upgrade steps that customers might need to perform, if any.
1. Fortify provides helm charts via OCI, and no longer provides helm charts via git. Currently we can not use `kpt` to update the chart. This process may be updated in the future, sourcing the chart from [fortifydocker/helm-ssc](https://hub.docker.com/r/fortifydocker/helm-ssc).
1. Run a helm dependency command to update the chart/charts/*.tgz archives and create a new requirements.lock file. You will commit the tar archives along with the requirements.lock that was generated.

    ```bash
    helm dependency update ./chart
    ```

1. In [`/chart/values.yaml`](/chart/values.yaml) update image.tag to the new version. Renovate might have already done this for you. Also update the `dev.bigbang.mil/applicationVersions`

   ```yaml
     dev.bigbang.mil/applicationVersions: |
    - Fortify: 24.4.3.0003
   ```

1. Update [`CHANGELOG.MD`](/CHANGELOG.md) with an entry for "upgrade Fortify to app version X.X.X chart version X.X.X-bb.X". Or, whatever description is appropriate.
1. Update the [`README.md`](/README.md) following the [gluon library script](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md)
1. Update [`/chart/Chart.yaml`](/chart/Chart.yaml) to the appropriate versions. The annotation version should match the `appVersion`.

    ```yaml
    version: X.X.X-bb.X
    appVersion: X.X.X.X
    annotations:
      bigbang.dev/applicationVersions: |
        - Fortify: 24.4.5.0009
    ```

SecurityContext should pull from values

   ```yaml
  securityContext:
    allowPrivilegeEscalation: false
    {{- toYaml .Values.containerSecurityContext | nindent 12 }}
    readOnlyRootFilesystem: true
  ```

1. Update [`/chart/Chart.yaml`](/chart/Chart.yaml) `annotations."helm.sh/images"` section to fix references to updated packages (if needed)
1. Use a development environment to deploy and test Fortify. See more detailed testing instructions below. Also test an upgrade by deploying the old version first and then deploying the new version.
1. When the Package pipeline runs expect the cypress tests to fail due to UI changes.
1. Update the [`/README.md`](/README.md) again if you have made any additional changes during the upgrade/testing process.
1. Revert changes to `chart/Values.yaml`

  ```yaml
  repositoryPrefix: "registry1.dso.mil/ironbank/microfocus/fortify/"
  # buildNumber: "" (this way it pulls from Chart.appVersion)
  ```

## Modifications made to upstream chart

This is a high-level list of modifications that Big Bang has made to the upstream helm chart. You can use this as as cross-check to make sure that no modifications were lost during the upgrade process.

### chart/charts/*.tgz

- run `helm dependency update ./chart` and commit the downloaded archives
- commit the tar archives that were downloaded from the helm dependency update command. And also commit the requirements.lock that was generated.

### chart/templates/bigbang/*

- add istio virtual service
- add networkpolicies
- add istio peerauthentications
- add opt-in custom log4j2 configmap to be mounted at `/opt/bigbang/log4j2-config-override.xml`.

### chart/templates/tests/*

- add templates for CI helm tests

### chart/templates/*.yaml

- add script-configmap.yaml
- add secrets.yaml
- add tomcat-configuration.yaml
- modify tomcat-configuration.yaml
  - Allow setting Tomcat server min/max threads within server configuration configmap
- modify webapp.yaml
  - set spec.template.spec.containers["webapp"].readinessProbe.initialDelaySeconds to `30`
  - set spec.template.spec.containers["webapp"].readinessProbe.periodSeconds to `20`
  - set spec.template.spec.containers["webapp"].readinessProbe.httpGet.path to `/images/favicon.ico`
  - set spec.template.spec.containers["webapp"].readinessProbe.httpGet.port `http-web`
  - set spec.template.spec.containers["webapp"].readinessProbe.httpGet.scheme `HTTP`
  - set spec.template.spec.containers["webapp"].readinessProbe.httpGet.httpHeaders["Host"].value to `{{ include "ssc.fullcomponentname" (merge (dict "component" "service") . ) }}`
  - add spec.template.spec.containers["webapp"].volumeMounts `.Values.webapp.extraVolumeMounts` for [additional mounts](https://repo1.dso.mil/big-bang/product/packages/fortify/-/merge_requests/174)

    ```yaml
            {{- with .Values.webapp.extraVolumeMounts }}
              {{- toYaml . | nindent 12 }}
            {{- end }}
    ```

  - set spec.template.spec.containers["webapp"].volumeMounts["secrets-volume"].name to `shared`
  - add spec.template.spec.initContainers

    ```yaml
    initContainers:
      - name: keystore-gen
        image: "{{ .Values.initContainer.keystoreImage }}:{{ .Values.initContainer.keystoreTag }}"
        imagePullPolicy: IfNotPresent
        command:
        - /bin/sh
        args:
        - /script/gen.sh
        volumeMounts:
        - name: keystore-script
          mountPath: /script
        - name: shared
          mountPath /shared
        - name: secrets-volume
          mountPath: /secrets
        resources:
          {{- toYaml .Values.initContainer.resources | nindent 12 }}
        {{- with .Values.webapp.extraInitContainers }}
          {{- toYaml . | nindent 8 }}
        {{- end }}
    ```

  - add spec.template.spec.volumes `Values.webapp.extraVolumes` for [additional volumes](https://repo1.dso.mil/big-bang/product/packages/fortify/-/merge_requests/174)

    ```yaml
        {{- with .Values.webapp.extraVolumes }}
          {{- toYaml . | nindent 8 }}
        {{- end }}
    ```

  - modify spec.template.spec.volumes["secrets-volume"]

    ```yaml
    - name: secrets-volume
          secret:
            {{- if not .Values.databaseSecret.use secret }}
            secretName: {{ include "ssc.fullcomponentname" (merge (dict "component" "secret") . ) }}
            {{- else }}
            secretName: {{ required "The secretRef.name config value is required!" .Values.secretRef.name }}
            {{- end }}
    ```

  - remove spec.template.spec.volumes["etc-volume"].medium
  - add spec.template.spec.volumes["shared"]

    ```yaml
    - name: shared
      emptydir: {}
    ```

  - add spec.template.spec.volumes["keystore-script"]

    ```yaml
    - name: keystore-script
      configMap:
        name: {{ include "ssc.fullcomponentname" (merge (dict "component" "keystore-script") . ) }}
    ```

  - add spec.template.spec.volumes["tomcat-template"]

    ```yaml
    - name: tomcat-template
      configMap:
        name: {{ include "ssc.fullcomponentname" (merge (dict "component" "tomcat-template") . ) }}
    ```

  - add spec.template.spec.volumes["log4j2-template"]

    ```yaml
    - name: log4j2-template
      configMap:
        name: {{ include "ssc.fullcomponentname" (merge (dict "component" "log4j2-template") . ) }}
    ```

### chart/tests/*

- add helm test scripts for CI pipeline

## chart/.helmignore

- add *.orig

## chart/Chart.yaml

- switch the api version to v2
- update the name to fortify-ssc
- change version key to Big Bang composite version
- add Big Bang annotations.dev.bigbang.mil/applicationVersions and annotations.helm.sh/images keys to support release automation
- add the following

  ```yaml
  type: application
  keywords:
  - fortify
  - ssc
  - sast
  home: https://www.microfocus.com/en-us/solutions/application-security
  icon: https://avatars.githubusercontent.com/u/28990234?s=200&v=4
  sources:
  - https://github.com/fortify/helm3-charts
  engine: gotpl
  ```

- add the dependencies that are needed

## chart/kpt.yaml

- add this to manage kpt

## chart/requirements.yaml

- add this to manage needed charts

## chart/values.yaml

- update the image.repositoryPrefix to ironbank
- comment out image.buildNumber
- change image.webapp to "ssc"
- add the desired image.tag
- add an array element to imagePullSecrets with the name set to "private-registry"
- set nameOverride to "fortify-ssc"
- set fullnameOverride to "fortify-ssc"
- set urlHost to "fortify.dev.bigbang.mil"
- set secretRef.keys.sscLicenseEntry to "fortify.license"
- set secretRef.keys.sscAutoconfigEntry to "fortify.autoconfig"
- set secretRef.keys.httpCertificateKeystoreFileEntry to "ssc-service.jks"
- set secretRef.keys.httpCertificateKeystorePasswordEntry to "ssc-service.jks.password"
- set secretRef.keys.httpCertificateKeyPasswordEntry to "ssc-service.jks.key.password"
- set jvmExtraOptions to "-Dcom.redhat.fips=false"
- set the resources like this
- add app and version under mysql.primary.podLabels

  ```yaml
  # Recommended resources can be found here - https://www.microfocus.com/documentation/fortify-ScanCentral-DAST/2120/Fortify_Sys_Reqs_21.2.0.pdf
  # Check page 33 and 41 for recommended resources depending on the type of scan (DAST vs SSC)
  resources:
    limits:
      cpu: 4
      memory: 16Gi
    requests:
      cpu: 1
      memory: 1Gi
  ```

- allow overriding mix and max threads allowed by ssc server with:

  ```yaml
  ssc:
    config:
      http:
        min_threads: 1
        max_threads: 4
      https:
        min_threads: 4
        max_threads: 150
  ```

- Allow verbose debug logs for SSC with:

  ```yaml
  ssc:
    config:
      log4j:
        enableDebugConfig: true
  ```

- add this to the bottom

  ```yaml
  # MySQL Dependency Values
  mysql:
    enabled: true
    global:
      imageRegistry: "registry1.dso.mil/ironbank"
      imagePullSecrets:
        - private-registry
    image:
      repository: bitnami/mysql8
      tag: 8.0.34-debian-11-r2
    auth:
      rootPassword: "password"
      database: "ssc_db"
    primary:
      configuration: |-
        [mysqld]
        default_authentication_plugin=mysql_native_password
        skip-name-resolve
        explicit_defaults_for_timestamp
        basedir=/opt/bitnami/mysql
        plugin_dir=/opt/bitnami/mysql/lib/plugin
        port=3306
        socket=/opt/bitnami/mysql/tmp/mysql.sock
        datadir=/bitnami/mysql/data
        tmpdir=/opt/bitnami/mysql/tmp
        bind-address=0.0.0.0
        pid-file=/opt/bitnami/mysql/tmp/mysqld.pid
        log-error=/opt/bitnami/mysql/logs/mysqld.log
        character-set-server=latin1
        collation-server=latin1_general_cs
        slow_query_log=0
        slow_query_log_file=/opt/bitnami/mysql/logs/mysqld.log
        long_query_time=10.0
        default_storage_engine=INNODB
        innodb_buffer_pool_size=512M
        innodb_lock_wait_timeout=300
        innodb_log_file_size=512M
        max_allowed_packet=1G
        sql-mode="TRADITIONAL"
  
        [mysqldump]
        max_allowed_packet=1G
  
        [client]
        port=3306
        socket=/opt/bitnami/mysql/tmp/mysql.sock
        default-character-set=UTF8
        plugin_dir=/opt/bitnami/mysql/lib/plugin
  
        [manager]
        port=3306
        socket=/opt/bitnami/mysql/tmp/mysql.sock
        pid-file=/opt/bitnami/mysql/tmp/mysqld.pid
      # resources for MySQL, recommended resources can be found here - https://www.microfocus.com/documentation/fortify-ScanCentral-DAST/2120/Fortify_Sys_Reqs_21.2.0.pdf
      # Page 22 for MySQL
      resources:
        limits:
          cpu: 8
          memory: 64Gi
        requests:
          cpu: 1
          memory: 500Mi
    secondary:
      # Page 22 for MySQL
      resources:
        limits:
          cpu: 8
          memory: 64Gi
        requests:
          cpu: 1
          memory: 500Mi
    metrics:
      # pulled from the chart example with some higher limits
      resources:
        limits:
          cpu: 2
          memory: 1Gi
        requests:
          cpu: 100m
          memory: 256Mi
  
  
  # Big Bang Additions
  domain: dev.bigbang.mil
  istio:
    enabled: false
    mtls:
      # -- STRICT = Allow only mutual TLS traffic,
      # PERMISSIVE = Allow both plain text and mutual TLS traffic
      mode: STRICT
    fortify:
      gateways:
      - "istio-system/public"
      hosts:
      - "fortify.{{ .Values.domain }}"
    injection: disabled
  
  initContainer:
    keystoreImage: registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24
    keystoreTag: 1.24.1
    resources:
      limits:
        cpu: 500m
        memory: 128Mi
      requests:
        cpu: 250m
        memory: 64Mi
  
  networkPolicies:
    enabled: false
    egress: []
    egressDns: []
    ingress: []
  
  # cache layer configurations
  # if this feature enabled, Fortify will cache the resource
  # `project/project_metadata/repository/artifact/manifest` in the redis
  # which help to improve the performance of high concurrent pulling manifest.
  cache:
    # default is not enabled.
    enabled: false
    # default keep cache for one day.
    expireHours: 24
  
  databaseSecret:
    use_secret: false
    name: db-credentials-mysql
    useRoot: false # Use root credentials to create database if required
  
  # Please read the docs to create java keystore and convert it into base64
  fortify_java_keystore:
    use: false
    keystore: "ZHVtbXkK" # base64 of keystore
  
  default_cert_alias: tomcat
  
  fortifySecret:
    use_secret: false
    name: fortify-secret
    # Secret contains following values:
    # certificate-key-password
    # certificate-keystore-password
    # scc.autoconfig
    # fortify.license
    # Note: certificate-keystore is generated by init container
  
  bbtests:
    enabled: false
    cypress:
      artifacts: true
      envs:
        cypress_url: "http://fortify-ssc-service:80"
        cypress_token: "change_me"
    scripts:
      image: "registry1.dso.mil/bigbang-ci/devops-tester:1.1.2"
      envs: {}
  
  
  trust_store_password: dsoppassword
  key_store_password: dsoppassword
  key_store_cert_password : dsoppassword
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
  fortify_license: |
    <License>
  ```

### automountServiceAccountToken

The mutating Kyverno policy named `update-automountserviceaccounttokens` is leveraged to harden all ServiceAccounts in this package with `automountServiceAccountToken: false`. This policy is configured by namespace in the Big Bang umbrella chart repository at [chart/templates/kyverno-policies/values.yaml](https://repo1.dso.mil/big-bang/bigbang/-/blob/master/chart/templates/kyverno-policies/values.yaml?ref_type=heads).

This policy revokes access to the K8s API for Pods utilizing said ServiceAccounts. If a Pod truly requires access to the K8s API (for app functionality), the Pod is added to the `pods:` array of the same mutating policy. This grants the Pod access to the API, and creates a Kyverno PolicyException to prevent an alert.
