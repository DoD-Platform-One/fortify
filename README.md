# fortify

![Version: 0.0.4](https://img.shields.io/badge/Version-0.0.4-informational?style=flat-square) ![Type: application](https://img.shields.io/badge/Type-application-informational?style=flat-square) ![AppVersion: 21.1.2.0005](https://img.shields.io/badge/AppVersion-21.1.2.0005-informational?style=flat-square)

A Helm chart for Microfocus Fortify SSC

## Learn More
* [Application Overview](docs/overview.md)
* [Other Documentation](docs/)

## Pre-Requisites

* Kubernetes Cluster deployed
* Kubernetes config installed in `~/.kube/config`
* Helm installed

Install Helm

https://helm.sh/docs/intro/install/

## Deployment

* Clone down the repository
* cd into directory
```bash
helm install fortify chart/
```

## Values

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| affinity | object | `{}` |  |
| databaseSecret.name | string | `"db-credentials-mysql"` |  |
| databaseSecret.useRoot | bool | `false` |  |
| databaseSecret.use_secret | bool | `false` |  |
| default_cert_alias | string | `"dsop"` |  |
| enforce_secure_transport | bool | `false` |  |
| fortifySecret.name | string | `"fortify-secret"` |  |
| fortifySecret.use_secret | bool | `false` |  |
| fortify_autoconfig | string | `"appProperties:\n  host.validation: false\n  searchIndex.location: '/fortify/ssc/index'\ndatasourceProperties:\n  jdbc.url: \"jdbc:mysql://fortify-mysql:3306/fortify?useSSL=false&connectionCollation=<collation>&rewriteBatchedStatements=true&max_allowed_packet=1073741824&sql_mode=TRADITIONAL\"\n  db.driver.class: com.mysql.cj.jdbc.Driver\n  db.username: <DB-USER>\n  db.password: <DB-PASSWORD>\n  db.dialect: com.fortify.manager.util.hibernate.MySQLDialect\n  db.like.specialCharacters: '%_\\\\'\ndbMigrationProperties:\n  migration.enabled: true\n"` |  |
| fortify_java_keystore.keystore | string | `"ZHVtbXkK"` |  |
| fortify_java_keystore.use | bool | `false` |  |
| fortify_license | string | `"Full License\n"` |  |
| hostname | string | `"fortify.bigbang.dev"` |  |
| image.imagePullSecrets | string | `"private-registry"` |  |
| image.pullPolicy | string | `"IfNotPresent"` |  |
| image.repository | string | `"registry1.dso.mil/ironbank/microfocus/fortify/ssc"` |  |
| image.tag | string | `"21.1.2.0005"` |  |
| initContainer.image | string | `"registry.dso.mil/platform-one/big-bang/apps/third-party/fortify/mysql-client"` |  |
| initContainer.keystoreImage | string | `"registry1.dso.mil/ironbank/redhat/openjdk/openjdk13"` |  |
| initContainer.keystoreTag | string | `"1.13.0"` |  |
| initContainer.resources.limits.cpu | string | `"500m"` |  |
| initContainer.resources.limits.memory | string | `"128Mi"` |  |
| initContainer.resources.requests.cpu | string | `"250m"` |  |
| initContainer.resources.requests.memory | string | `"64Mi"` |  |
| initContainer.tag | string | `"8.0.21"` |  |
| istio.enabled | bool | `false` |  |
| istio.gateways[0] | string | `"istio-system/main"` |  |
| jdbc_driver | string | `"https://repo1.maven.org/maven2/mysql/mysql-connector-java/8.0.21/mysql-connector-java-8.0.21.jar"` |  |
| key_store_cert_password | string | `""` |  |
| key_store_password | string | `""` |  |
| mysql.auth.password | string | `"admin"` |  |
| mysql.auth.rootPassword | string | `"root"` |  |
| mysql.auth.username | string | `"admin"` |  |
| mysql.enabled | bool | `true` |  |
| mysql.fullnameOverride | string | `"fortify-mysql"` |  |
| mysql.image.pullSecrets[0] | string | `"private-registry"` |  |
| mysql.image.registry | string | `"registry1.dso.mil"` |  |
| mysql.image.repository | string | `"ironbank/bitnami/mysql8"` |  |
| mysql.image.tag | string | `"8.0.28"` |  |
| networkPolicies.egress | list | `[]` |  |
| networkPolicies.egressDns | list | `[]` |  |
| networkPolicies.enabled | bool | `false` |  |
| networkPolicies.ingress | list | `[]` |  |
| nodeSelector | object | `{}` |  |
| port.http | int | `8080` |  |
| port.https | int | `8443` |  |
| replicaCount | int | `1` |  |
| resources.limits.cpu | int | `2` |  |
| resources.limits.memory | string | `"4Gi"` |  |
| resources.requests.cpu | int | `1` |  |
| resources.requests.memory | string | `"1Gi"` |  |
| runAsRootGroup | bool | `true` |  |
| storage.volume | string | `"50Gi"` |  |
| tolerations | list | `[]` |  |

## Contributing

Please see the [contributing guide](./CONTRIBUTING.md) if you are interested in contributing.
