<!-- Warning: Do not manually edit this file. See notes on gluon + helm-docs at the end of this file for more information. -->
# fortify-ssc

![Version: 1.1.2320154-bb.26](https://img.shields.io/badge/Version-1.1.2320154--bb.26-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 24.4.3.0003](https://img.shields.io/badge/AppVersion-24.4.3.0003-informational?style=flat-square) ![Maintenance Track: bb_integrated](https://img.shields.io/badge/Maintenance_Track-bb_integrated-green?style=flat-square)

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
| openshift | bool | `false` |  |
| image.repositoryPrefix | string | `"registry1.dso.mil/ironbank/microfocus/fortify/"` |  |
| image.pullPolicy | string | `"Always"` |  |
| image.webapp | string | `"ssc"` |  |
| image.tag | string | `"24.4.3.0003"` |  |
| securityContext.enabled | bool | `true` |  |
| securityContext.capabilities.drop[0] | string | `"ALL"` |  |
| securityContext.fsGroup | int | `1111` |  |
| securityContext.fsGroupChangePolicy | string | `"OnRootMismatch"` |  |
| securityContext.runAsUser | int | `1111` |  |
| securityContext.runAsGroup | int | `1111` |  |
| securityContext.runAsNonRoot | bool | `true` |  |
| containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| containerSecurityContext.fsGroup | int | `1111` |  |
| containerSecurityContext.fsGroupChangePolicy | string | `"OnRootMismatch"` |  |
| containerSecurityContext.runAsUser | int | `1111` |  |
| containerSecurityContext.runAsGroup | int | `1111` |  |
| containerSecurityContext.runAsNonRoot | bool | `true` |  |
| imagePullSecrets[0].name | string | `"private-registry"` |  |
| nameOverride | string | `"fortify-ssc"` |  |
| fullnameOverride | string | `"fortify-ssc"` |  |
| service.type | string | `"ClusterIP"` |  |
| service.httpPort | int | `80` |  |
| service.httpsPort | int | `443` |  |
| service.clusterIP | string | `""` |  |
| service.loadBalancerIP | string | `""` |  |
| service.annotations | object | `{}` |  |
| urlHost | string | `"fortify.dev.bigbang.mil"` |  |
| urlPort | int | `0` |  |
| sscPathPrefix | string | `"/"` |  |
| httpClientCertificateVerification | string | `"none"` |  |
| secretRef.name | string | `""` |  |
| secretRef.keys.sscLicenseEntry | string | `"fortify.license"` |  |
| secretRef.keys.sscAutoconfigEntry | string | `"ssc.autoconfig"` |  |
| secretRef.keys.sscSecretKeyEntry | string | `""` |  |
| secretRef.keys.httpCertificateKeystoreFileEntry | string | `"ssc-service.jks"` |  |
| secretRef.keys.httpCertificateKeystorePasswordEntry | string | `"ssc-service.jks.password"` |  |
| secretRef.keys.httpCertificateKeyPasswordEntry | string | `"ssc-service.jks.key.password"` |  |
| secretRef.keys.httpTruststoreFileEntry | string | `""` |  |
| secretRef.keys.httpTruststorePasswordEntry | string | `""` |  |
| secretRef.keys.jvmTruststoreFileEntry | string | `""` |  |
| secretRef.keys.jvmTruststorePasswordEntry | string | `""` |  |
| ssc.config.http.min_threads | int | `1` |  |
| ssc.config.http.max_threads | int | `4` |  |
| ssc.config.https.min_threads | int | `4` |  |
| ssc.config.https.max_threads | int | `150` |  |
| ssc.config.log4j.enableDebugConfig | bool | `false` |  |
| ssc.config.log4j.customXMLConfigString | string | `""` |  |
| persistentVolumeClaim.size | string | `"4Gi"` |  |
| persistentVolumeClaim.storageClassName | string | `""` |  |
| persistentVolumeClaim.selector | object | `{}` |  |
| environment | list | `[]` |  |
| jvmMaxRAMPercentage | int | `86` |  |
| jvmExtraOptions | string | `"-Dcom.redhat.fips=false"` |  |
| resources.limits.cpu | int | `4` |  |
| resources.limits.memory | string | `"16Gi"` |  |
| resources.requests.cpu | int | `1` |  |
| resources.requests.memory | string | `"1Gi"` |  |
| user.uid | int | `1111` |  |
| user.gid | int | `1111` |  |
| nodeSelector."kubernetes.io/os" | string | `"linux"` |  |
| nodeSelector."kubernetes.io/arch" | string | `"amd64"` |  |
| tolerations | list | `[]` |  |
| affinity | object | `{}` |  |
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
| domain | string | `"dev.bigbang.mil"` |  |
| istio.enabled | bool | `false` |  |
| istio.hardened.enabled | bool | `false` |  |
| istio.hardened.outboundTrafficPolicyMode | string | `"REGISTRY_ONLY"` |  |
| istio.hardened.customServiceEntries | list | `[]` |  |
| istio.hardened.customAuthorizationPolicies | list | `[]` |  |
| istio.hardened.monitoring.enabled | bool | `true` |  |
| istio.hardened.monitoring.namespaces[0] | string | `"monitoring"` |  |
| istio.hardened.monitoring.principals[0] | string | `"cluster.local/ns/monitoring/sa/monitoring-monitoring-kube-prometheus"` |  |
| istio.mtls.mode | string | `"STRICT"` | STRICT = Allow only mutual TLS traffic, PERMISSIVE = Allow both plain text and mutual TLS traffic |
| istio.fortify.gateways[0] | string | `"istio-system/public"` |  |
| istio.fortify.hosts[0] | string | `"fortify.{{ .Values.domain }}"` |  |
| istio.injection | string | `"disabled"` |  |
| initContainer.keystoreImage | string | `"registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24"` |  |
| initContainer.keystoreTag | string | `"1.24.1"` |  |
| initContainer.resources.limits.cpu | string | `"500m"` |  |
| initContainer.resources.limits.memory | string | `"128Mi"` |  |
| initContainer.resources.requests.cpu | string | `"250m"` |  |
| initContainer.resources.requests.memory | string | `"64Mi"` |  |
| initContainer.containerSecurityContext.enabled | bool | `true` |  |
| initContainer.containerSecurityContext.capabilities.drop[0] | string | `"ALL"` |  |
| initContainer.containerSecurityContext.fsGroup | int | `1111` |  |
| initContainer.containerSecurityContext.fsGroupChangePolicy | string | `"OnRootMismatch"` |  |
| initContainer.containerSecurityContext.runAsUser | int | `1111` |  |
| initContainer.containerSecurityContext.runAsGroup | int | `1111` |  |
| initContainer.containerSecurityContext.runAsNonRoot | bool | `true` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingressLabels.app | string | `"istio-ingressgateway"` |  |
| networkPolicies.ingressLabels.istio | string | `"ingressgateway"` |  |
| networkPolicies.additionalPolicies | list | `[]` |  |
| cache.enabled | bool | `false` |  |
| cache.expireHours | int | `24` |  |
| databaseSecret.use_secret | bool | `false` |  |
| databaseSecret.name | string | `"db-credentials-mysql"` |  |
| databaseSecret.useRoot | bool | `false` |  |
| fortify_java_keystore.use | bool | `false` |  |
| fortify_java_keystore.keystore | string | `"ZHVtbXkK"` |  |
| default_cert_alias | string | `"tomcat"` |  |
| fortifySecret.use_secret | bool | `false` |  |
| fortifySecret.name | string | `"fortify-secret"` |  |
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
| trust_store_password | string | `"dsoppassword"` |  |
| key_store_password | string | `"dsoppassword"` |  |
| key_store_cert_password | string | `"dsoppassword"` |  |
| fortify_autoconfig | string | `"appProperties:\n  host.validation: false\n\ndatasourceProperties:\n  db.username: root\n  db.password: password\n\n  jdbc.url: 'jdbc:mysql://fortify-mysql:3306/ssc_db?sessionVariables=collation_connection=latin1_general_cs&rewriteBatchedStatements=true'\n\ndbMigrationProperties:\n\n  migration.enabled: true\n  migration.username: root\n  migration.password: password\n"` |  |
| fortify_license | string | `"<License>\n"` |  |
| webapp.extraVolumes | list | `[]` |  |
| webapp.extraVolumeMounts | list | `[]` |  |
| webapp.extraInitContainers | list | `[]` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.

---

_This file is programatically generated using `helm-docs` and some BigBang-specific templates. The `gluon` repository has [instructions for regenerating package READMEs](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-package-readme.md)._

