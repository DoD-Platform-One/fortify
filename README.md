<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# fortify-ssc

![Version: 25.4.0-bb.1](https://img.shields.io/badge/Version-25.4.0--bb.1-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 25.4.0.0137](https://img.shields.io/badge/AppVersion-25.4.0.0137-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

A Helm chart for Fortify Software Security Center application

## Upstream References

- <https://www.microfocus.com/en-us/solutions/application-security>
- <https://github.com/fortify/helm3-charts>

## Upstream Release Notes

- [Find our upstream chart's CHANGELOG here](https://github.com/fortify/helm3-charts/tree/main/charts)
- [and our upstream application release notes here](https://www.microfocus.com/documentation/fortify-core-documents/2420/FortifySW_RN_24.2.0.pdf)

## Learn More

- [Application Overview](docs/overview.md)
- [Other Documentation](docs/)

## Pre-Requisites

- Kubernetes Cluster deployed
- Kubernetes config installed in `~/.kube/config`
- Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

- Clone down the repository
- cd into directory

```bash
helm install fortify-ssc chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| upstream.podAnnotations."proxy.istio.io/config" | string | `"{\"holdApplicationUntilProxyStarts\": true}"` |  |
| upstream.image.repository | string | `"registry1.dso.mil/ironbank/microfocus/fortify/ssc"` |  |
| upstream.image.pullPolicy | string | `"Always"` |  |
| upstream.image.tag | string | `"25.4.0.0137"` |  |
| upstream.imagePullSecrets[0].name | string | `"private-registry"` |  |
| upstream.nameOverride | string | `"fortify-ssc"` |  |
| upstream.fullnameOverride | string | `"fortify-ssc"` |  |
| upstream.urlHost | string | `"fortify.dev.bigbang.mil"` |  |
| upstream.secretRef.name | string | `"fortify-ssc-secret"` |  |
| upstream.secretRef.keys.sscLicenseEntry | string | `"fortify.license"` |  |
| upstream.secretRef.keys.sscAutoconfigEntry | string | `"ssc.autoconfig"` |  |
| upstream.secretRef.keys.httpCertificateKeystoreFileEntry | string | `"ssc-service.jks"` |  |
| upstream.secretRef.keys.httpCertificateKeystorePasswordEntry | string | `"ssc-service.jks.password"` |  |
| upstream.secretRef.keys.httpCertificateKeyPasswordEntry | string | `"ssc-service.jks.key.password"` |  |
| upstream.environment[0].name | string | `"COM_FORTIFY_SSC_ENFORCESECURETRANSPORT"` |  |
| upstream.environment[0].value | string | `"false"` |  |
| upstream.jvmExtraOptions | string | `"-Dcom.redhat.fips=false"` |  |
| upstream.resources.limits.cpu | int | `4` |  |
| upstream.resources.limits.memory | string | `"16Gi"` |  |
| upstream.resources.requests.memory | string | `"4Gi"` |  |
| upstream.user.gid | int | `1111` |  |
| openshift | bool | `false` |  |
| nameOverride | string | `"fortify-ssc"` |  |
| fullnameOverride | string | `"fortify-ssc"` |  |
| mysql.enabled | bool | `true` |  |
| mysql.fullnameOverride | string | `""` |  |
| mysql.global.imageRegistry | string | `"registry1.dso.mil/ironbank"` |  |
| mysql.global.imagePullSecrets[0] | string | `"private-registry"` |  |
| mysql.image.repository | string | `"bitnami/mysql8"` |  |
| mysql.image.tag | string | `"8.0.36-debian-11-r1"` |  |
| mysql.auth.rootPassword | string | `"password"` |  |
| mysql.auth.database | string | `"ssc_db"` |  |
| mysql.primary.configuration | string | `"[mysqld]\ndefault_authentication_plugin=mysql_native_password\nskip-name-resolve\nexplicit_defaults_for_timestamp\nbasedir=/opt/bitnami/mysql\nplugin_dir=/opt/bitnami/mysql/lib/plugin\nport=3306\nsocket=/opt/bitnami/mysql/tmp/mysql.sock\ndatadir=/bitnami/mysql/data\ntmpdir=/opt/bitnami/mysql/tmp\nbind-address=0.0.0.0\npid-file=/opt/bitnami/mysql/tmp/mysqld.pid\nlog-error=/opt/bitnami/mysql/logs/mysqld.log\ncharacter-set-server=latin1\ncollation-server=latin1_general_cs\nslow_query_log=0\nslow_query_log_file=/opt/bitnami/mysql/logs/mysqld.log\nlong_query_time=10.0\ndefault_storage_engine=INNODB\ninnodb_buffer_pool_size=512M\ninnodb_lock_wait_timeout=300\ninnodb_log_file_size=512M\nmax_allowed_packet=1G\nsql-mode=\"TRADITIONAL\"\n\n[mysqldump]\nmax_allowed_packet=1G\n\n[client]\nport=3306\nsocket=/opt/bitnami/mysql/tmp/mysql.sock\ndefault-character-set=UTF8\nplugin_dir=/opt/bitnami/mysql/lib/plugin\n\n[manager]\nport=3306\nsocket=/opt/bitnami/mysql/tmp/mysql.sock\npid-file=/opt/bitnami/mysql/tmp/mysqld.pid"` |  |
| mysql.primary.resources.limits.cpu | int | `8` |  |
| mysql.primary.resources.limits.memory | string | `"64Gi"` |  |
| mysql.primary.resources.requests.cpu | int | `4` |  |
| mysql.primary.resources.requests.memory | string | `"16Gi"` |  |
| mysql.primary.podSecurityContext.enabled | bool | `true` |  |
| mysql.primary.podSecurityContext.fsGroup | int | `1001` |  |
| mysql.primary.containerSecurityContext.enabled | bool | `true` |  |
| mysql.primary.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| mysql.primary.containerSecurityContext.runAsUser | int | `1001` |  |
| mysql.primary.containerSecurityContext.runAsGroup | int | `1001` |  |
| mysql.primary.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| mysql.secondary.resources.limits.cpu | int | `8` |  |
| mysql.secondary.resources.limits.memory | string | `"64Gi"` |  |
| mysql.secondary.resources.requests.cpu | int | `4` |  |
| mysql.secondary.resources.requests.memory | string | `"16Gi"` |  |
| mysql.secondary.podSecurityContext.enabled | bool | `true` |  |
| mysql.secondary.podSecurityContext.fsGroup | int | `1001` |  |
| mysql.secondary.containerSecurityContext.enabled | bool | `true` |  |
| mysql.secondary.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| mysql.secondary.containerSecurityContext.runAsUser | int | `1001` |  |
| mysql.secondary.containerSecurityContext.runAsGroup | int | `1001` |  |
| mysql.secondary.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| mysql.metrics.resources.limits.cpu | int | `2` |  |
| mysql.metrics.resources.limits.memory | string | `"1Gi"` |  |
| mysql.metrics.resources.requests.cpu | string | `"100m"` |  |
| mysql.metrics.resources.requests.memory | string | `"256Mi"` |  |
| mysql.metrics.podSecurityContext.enabled | bool | `true` |  |
| mysql.metrics.podSecurityContext.fsGroup | int | `1001` |  |
| mysql.metrics.containerSecurityContext.enabled | bool | `true` |  |
| mysql.metrics.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| mysql.metrics.containerSecurityContext.runAsUser | int | `1001` |  |
| mysql.metrics.containerSecurityContext.runAsGroup | int | `1001` |  |
| mysql.metrics.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| keystoreJob.enabled | bool | `true` |  |
| keystoreJob.recreate | bool | `false` |  |
| keystoreJob.certAlias | string | `"tomcat"` |  |
| keystoreJob.trustStorePassword | string | `"dsoppassword"` |  |
| keystoreJob.keyStorePassword | string | `"dsoppassword"` |  |
| keystoreJob.keyStoreCertPassword | string | `"dsoppassword"` |  |
| keystoreJob.image | string | `"registry1.dso.mil/ironbank/redhat/ubi/ubi9"` |  |
| keystoreJob.tag | string | `"9.5"` |  |
| keystoreJob.resources.limits.cpu | string | `"500m"` |  |
| keystoreJob.resources.limits.memory | string | `"128Mi"` |  |
| keystoreJob.resources.requests.cpu | string | `"250m"` |  |
| keystoreJob.resources.requests.memory | string | `"64Mi"` |  |
| domain | string | `"dev.bigbang.mil"` |  |
| istio.enabled | bool | `false` |  |
| istio.mtls.mode | string | `"STRICT"` |  |
| istio.sidecar.enabled | bool | `false` |  |
| istio.sidecar.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.serviceEntries.custom | list | `[]` |  |
| istio.authorizationPolicies.enabled | bool | `false` |  |
| istio.authorizationPolicies.custom | list | `[]` |  |
| routes.inbound.fortify.enabled | bool | `true` |  |
| routes.inbound.fortify.gateways[0] | string | `"istio-gateway/public-ingressgateway"` |  |
| routes.inbound.fortify.hosts[0] | string | `"fortify.{{ .Values.domain }}"` |  |
| routes.inbound.fortify.service | string | `"fortify-ssc-service"` |  |
| routes.inbound.fortify.port | int | `80` |  |
| routes.inbound.fortify.containerPort | int | `8080` |  |
| routes.inbound.fortify.selector."app.kubernetes.io/name" | string | `"fortify-ssc"` |  |
| routes.inbound.fortify.selector."app.kubernetes.io/component" | string | `"webapp"` |  |
| routes.outbound.bb-tests.enabled | bool | `false` |  |
| routes.outbound.bb-tests.hosts[0] | string | `"repo1.dso.mil"` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.hbonePortInjection.enabled | bool | `false` |  |
| networkPolicies.egress.definitions.external-mysql.to | list | `[]` |  |
| networkPolicies.egress.definitions.external-mysql.ports[0].port | int | `3306` |  |
| networkPolicies.egress.definitions.external-mysql.ports[0].protocol | string | `"TCP"` |  |
| networkPolicies.egress.from.fortify-webapp.podSelector.matchLabels."app.kubernetes.io/name" | string | `"fortify-ssc"` |  |
| networkPolicies.egress.from.fortify-webapp.podSelector.matchLabels."app.kubernetes.io/component" | string | `"webapp"` |  |
| networkPolicies.egress.from.fortify-webapp.to.definition.external-mysql | bool | `false` |  |
| networkPolicies.egress.from.keystore-job.podSelector.matchLabels.job | string | `"keystore-generator"` |  |
| networkPolicies.egress.from.keystore-job.to.definition.kubeAPI | bool | `true` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| bbtests.enabled | bool | `false` |  |
| bbtests.cypress.artifacts | bool | `true` |  |
| bbtests.cypress.envs.cypress_url | string | `"http://fortify-ssc-service:80"` |  |
| bbtests.cypress.envs.cypress_user | string | `"admin"` |  |
| bbtests.cypress.envs.cypress_password | string | `"admin"` |  |
| bbtests.cypress.resources.requests.cpu | string | `"2"` |  |
| bbtests.cypress.resources.requests.memory | string | `"4Gi"` |  |
| bbtests.cypress.resources.limits.cpu | string | `"2"` |  |
| bbtests.cypress.resources.limits.memory | string | `"4Gi"` |  |
| bbtests.scripts.image | string | `"registry1.dso.mil/bigbang-ci/devops-tester:1.1.2"` |  |
| bbtests.scripts.envs | object | `{}` |  |
| fortify_autoconfig | string | `"appProperties:\n  host.validation: false\n  http.min_threads: 1\n  http.max_threads: 4\n  https.min_threads: 4\n  https.max_threads: 150\n\ndatasourceProperties:\n  db.username: root\n  db.password: password\n\n  jdbc.url: 'jdbc:mysql://fortify-mysql:3306/ssc_db?sessionVariables=collation_connection=latin1_general_cs&rewriteBatchedStatements=true'\n\ndbMigrationProperties:\n\n  migration.enabled: true\n  migration.username: root\n  migration.password: password\n"` |  |
| fortify_license | string | `"<License>\n"` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

