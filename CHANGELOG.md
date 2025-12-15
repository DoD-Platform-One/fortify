# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.2320154-bb.39] - 2025-11-07

### Fixed

- registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24.9 (source) -> 1.24.10

## [1.1.2320154-bb.38] - 2025-11-06

### Fixed

- registry1.dso.mil/ironbank/microfocus/fortify/ssc (source) version 25.2.1.0010 -> 25.4.0.0137

## [1.1.2320154-bb.37] - 2025-10-16

### Fixed

- registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24.8 (source) -> 1.24.9

## [1.1.2320154-bb.36] - 2025-10-15

### Fixed

- registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24.7 (source) -> 1.24.8

## [1.1.2320154-bb.35] - 2025-10-08

### Fixed

- Fix renovate to consolidate changes into one MR

## [1.1.2320154-bb.34] - 2025-09-12

### Fixed

- registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24.6 (source) -> 1.24.7

## [1.1.2320154-bb.33] - 2025-08-08

### Fixed

- registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24.5 (source) -> 1.24.6

## [1.1.2320154-bb.32] - 2025-07-22

### Fixed

- Updated istio configuration to default the namespaceSelector to `istio-gateway` instead of `istio-controlplane`

## [1.1.2320154-bb.31] - 2025-07-17

### Fixed

- Updated renovate matcher to properly update golang-1.24
- Updated renovate matcher to catch all version tags of Fortify

## [1.1.2320154-bb.30] - 2025-07-15

### Changed

- registry1.dso.mil/ironbank/google/golang/ubi9/golang-1.24.4 (source) -> 1.24.5
- registry1.dso.mil/ironbank/microfocus/fortify/ssc (source) version 25.2.0.0157 -> 25.2.1.0010

## [1.1.2320154-bb.29] - 2025-06-25

### Fixed

- Increased the minimum memory for Fortify to `4Gi`

## [1.1.2320154-bb.28] - 2025-06-09

### Changed

- Update golang version 1.24.3 -> 1.24.4

## [1.1.2320154-bb.27] - 2025-06-05

### Changed

- Update Fortify version to 25.2.0.0157

## [1.1.2320154-bb.26] - 2025-05-20

### Changed

- Update gluon 0.5.0 -> 0.5.20
- Updated google/golang/golang-1.24.1 -> google/golang/ubi9/golang-1.24.3
- Updated fortify to version 24.4.3.0003

## [1.1.2320154-bb.25] - 2025-05-14

### Changed

- Updated spec.selector.matchLabels for AuthorizationPolicies consistent to other resources

## [1.1.2320154-bb.24] - 2025-03-28

### Changed

- Updated google/golang/golang-1.20 -> google/golang/ubi9/golang-1.24

## [1.1.2320154-bb.23] - 2025-03-21

### Changed

- Enabled dynamic network policy for istio

## [1.1.2320154-bb.22] - 2024-12-13

### Changed

- Update gluon 0.5.0 -> 0.5.12
- Update bbtests image to use common devops ci test image
- Updated fortify to version 24.4.2.0009

## [1.1.2320154-bb.21] - 2024-12-11

### Changed

- Updated Fortify to version 24.4.1.0005

## [1.1.2320154-bb.20] - 2024-11-21

### Changed

- Reverted changes made from previou Kiali labelling strategy
- Updated labels used for pod from `ssc.selector` to `ssc.labels` to ensure all required labels get applied properly
- Added the maintenance track annotation and badge

## [1.1.2320154-bb.19] - 2024-09-10

### Added

- Modified templating for `podLabels` in `webapp.yaml` to use `tpl` function to support passing kiali-required labels.
- Added app and verison podLabels in values.yaml under mysql.primary.podLabels.

## [1.1.2320154-bb.18] - 2024-08-22

### Added

- Added configurations to allow for adding extra volumes, volume mounts and init containers to the webapp

## [1.1.2320154-bb.17] - 2024-08-22

### Added

- Added allow-sidecar-scraping NetworkPolicy

## [1.1.2320154-bb.16] - 2024-08-13

### Changed

- Removed redundant entries in package test-values.yaml already in package values.yaml and
- Updated cypress resources to standard 2 cpu and 4 Gi memory
- updated upstream releasenotes

## [1.1.2320154-bb.15] - 2024-06-25

### Changed

- Removed the allow nothing policy
- Moved the authorization policies
- Updated the istio hardened doc

## [1.1.2320154-bb.14] - 2024-06-14

### Changed

- Overhauled log4j config customization.

### Removed

- Removed our recently-added `initContainer` (`log4j-config-pinner`) in favor of using the vendor-provided `COM_FORTIFY_SSC_LOG4J2_OVERRIDE` to wire in our own (opt-in!) volume-mounted custom XML configuration overrides at `/opt/bigbang/log4j2-config-override.xml`.
- Previous `.Values.ssc.config.log4j` options have been removed in favor of the two new options described below.

### Added

- Set `.Values.ssc.config.log4j.enableDebugConfig` to `true` to have SSC use log level `debug` and print logs to `STDOUT`. Not recommended as an always-on default.
- Should you need to *fully* customize Fortify SSC's log configuration, paste in your own log4j2 config as a multiline XML string at `.Values.ssc.config.log4j.customXMLConfigString`.

## [1.1.2320154-bb.13] - 2024-06-13

### Removed

- resource overrides from test values

## [1.1.2320154-bb.12] - 2024-06-13

### Added

- Fixed link to tests/wait.sh that was breaking bb-docs: [docs/log-configuration.md](docs/log-configuration.md)

## [1.1.2320154-bb.11] - 2024-06-11

### Changed

- correct mysql chart from 11.1.2 to 9.19.0

## [1.1.2320154-bb.10] - 2024-06-08

### Changed

- gluon updated from 0.4.7 to 0.5.0
- mysql updated from 9.14.4 to 11.1.2
- ironbank/bitnami/mysql8 updated from 8.0.35 to 8.0.36
- ironbank/google/golang/golang-1.20 updated from 1.20.12 to 1.20.14
- ironbank/microfocus/fortify/ssc updated from 23.2.0.0154 to 24.2.0.0186

## [1.1.2320154-bb.9] - 2024-06-06

### Added

- Sidecar and service entry resource for whitelist

## [1.1.2320154-bb.8] - 2024-06-04

### Added

- Adds new developer documentation on the surprisingly complex how and why of our log4j configuration override workflow: [docs/log-configuration.md](docs/log-configuration.md)

### Fixed

- Bugfix to previous release — log4j config pinning init container failed as it was using a container that did not expose the COM_FORTIFY_SSC_HOME environment variable.
- Improved wording of the CI test in `wait.sh` to allow operators to better judge the results of that CI test.

## [1.1.2320154-bb.7] - 2024-05-31

### Fixed

- Bugfix to previous release — log4j config customization was getting overwritten at boot but should now stay put.

### Added

- Added a new CI test to confirm our custom config file is in force after a successful fortify SSC boot.

## [1.1.2320154-bb.6] - 2024-05-28

### Added

- Configurable log level for Fortify SSC: `ssc.config.log4j.rootLevel: "warn"`
- *Opt-in* cloning of Fortify SSC's primary rotating-files-on-disk logger to `STDOUT`: `ssc.config.log4j.copyRootToStdout: true`

## [1.1.2320154-bb.5] - 2024-04-19

### Fixed

- Resolved typo to correctly output the autoconfig used in logs as part of the startup

## [1.1.2320154-bb.4] - 2024-04-12

### Added

- Custom network policies

## [1.1.2320154-bb.3] - 2024-03-27

### Added

- Added allow-intranamespace policy
- Added allow-nothing-policy
- Added ingressgateway-authz-policy
- Added monitoring-authz-policy
- Added allow-mysql-policy
- Added template for adding user defined policies

## [1.1.2320154-bb.2] - 2024-03-04

### Changed

- Added Openshift update for deploying fortify into Openshift cluster

## [1.1.2320154-bb.1] - 2024-01-16

### Changed

- Updated gluon to 0.4.7
- Removed cypress config as it is now coming from gluon
- Updated cypress test as it was doing configuration in addition to testing

## [1.1.2320154-bb.0] - 2023-12-12

### Changed

- ironbank/google/golang/golang-1.20 updated from 1.20.11 to 1.20.12
- ironbank/microfocus/fortify/ssc updated from 23.1.2.0005 to 23.2.0.0154

## [1.1.2311007-bb.9] - 2023-12-02

### Changed

- mysql updated from 9.14.2 to 9.14.4
- ironbank/google/golang/golang-1.20 updated from 1.20.10 to 1.20.11

## [1.1.2311007-bb.8] - 2023-12-01

### Changed

- mysql updated from 9.14.1 to 9.14.2

## [1.1.2311007-bb.7] - 2023-11-01

### Changed

- Enabling Video cypress artifacts to be saved through new version of Gluon

## [1.1.2311007-bb.6] - 2023-11-01

### Changed

- gluon updated from 0.4.1 to 0.4.4
- mysql updated from 9.12.3 to 9.14.1
- ironbank/google/golang/golang-1.20 updated from 1.20.8 to 1.20.10

## [1.1.2311007-bb.5] - 2023-10-20

### Updated

- Added non-root-group to sql
- Image updated for MySql to `8.0.34-debian-11-r2`

## [1.1.2311007-bb.4] - 2023-10-25

### Updated

- Allow overriding mix and max threads for ssc tomcat server

## [1.1.2311007-bb.3] - 2023-10-12

### Updated

- Updated cypress implementation to fix broken pipeline
- Updated mysql 9.12.0 -> 9.12.3

## [1.1.2311007-bb.2] - 2023-10-06

### Updated

- fixed the network policy error

## [1.1.2311007-bb.1] - 2023-09-26

### Updated

- fixed the requests and limits in the pipeline

## [1.1.2311007-bb.0] - 2023-09-25

### Updated

- Updated tag versioning 0.2.0-bb.x to 1.1.2311007-bb.x

## [0.2.0-bb.20] - 2023-09-22

### Updated

- fixed a bug around the mysql credentials when using an out of cluster db

## [0.2.0-bb.19] - 2023-09-20

### Updated

- added the COM_FORTIFY_SSC_ENFORCESECURETRANSPORT variable to enable 8080 port for Istio TLS termination.

## [0.2.0-bb.18] - 2023-09-20

### Updated

- added Cap drop ALL to securityContext

## [0.2.0-bb.17] - 2023-09-19

### Updated

- added the DEVELOPMENT_MAINTENANCE.md
- changed some defaults to match the upstream
- restored the /etc mount
- added kpt management
- note that there is a [requirement now for mysql 8, sql server 2017, or oracle 12c or newer](https://www.microfocus.com/documentation/fortify-core-documents/2310/Fortify_Sys_Reqs_23.1.0/index.htm#SSC/SSC_Databases.htm?TocPath=Fortify%2520Software%2520Security%2520Center%2520Server%2520Requirements%257C_____4)

## [0.2.0-bb.16] - 2023-09-14

### Updated

- switching mysql to oci

## [0.2.0-bb.15] - 2023-09-14

### Updated

- updated the url for fortify

## [0.2.0-bb.14] - 2023-09-12

### Updated

- added back the conditional dependency for mysql

## [0.2.0-bb.13] - 2023-09-12

### Changed

- docker.io/bitnami/mysql updated from 8.0.34 to 8.1.0
- gluon updated from 0.3.2 to 0.4.0
- ironbank/google/golang/golang-1.20 updated from 1.20.7 to 1.20.8

## [0.2.0-bb.12] - 2023-08-24

### Updated

- updated init container image used by gen.sh
- mysql chart updated from 9.11.1 to 9.12.0

## [0.2.0-bb.11] - 2023-08-22

### Updated

- updated resource limits in chart/values.yaml

## [0.2.0-bb.10] - 2023-08-22

### Changed

- gluon updated from 0.3.2 to 0.4.0

## [0.2.0-bb.9] - 2023-08-21

### Added

- \fortify\chart\templates\bigbang\networkpolicies\egress-helm-tests.yaml
- Adding Helm Cypress Egress policy to allow the cypress tests to resolve *.bigbang.dev.

## [0.2.0-bb.8] - 2023-08-21

### Changed

- update `allow-all-egress` netpol

## [0.2.0-bb.7] - 2023-08-21

### Updated

- Enabled Istio MTLS for Fortify

## [0.2.0-bb.6] - 2023-08-19

### Changed

- docker.io/bitnami/mysql updated from 8.0.34 to 8.1.0

## [0.2.0-bb.5] - 2023-08-17

### Added

- Standard network policies added to the `templates/bigbang` directory

## [0.2.0-bb.4] - 2023-07-31

### Changed

- changed to include helm tests.

## [0.2.0-bb.3] - 2023-08-18

### Updated

- Updated mysql chart to 9.11.1

## [0.2.0-bb.1] - 2023-07-28

### Updated

- Updated helm charts to version 23.1.2.0005

## [0.2.0-bb.0] - 2023-07-28

### Changed

- ironbank/microfocus/fortify/ssc updated from 22.2.1.0008 to 23.1.1.0007

### Updated

- Updated mysql to 9.10.9

## [0.1.0-bb.0] - 2023-03-16

### Changed

- ironbank/microfocus/fortify/ssc updated from 22.1.2.0004 to 22.2.1.0008
- changed autoconfig settings to be blank. Can re-add once bigbang has a license to test with

### Updated

- Updated mysql to 9.6.0

## [0.0.9-bb.2] - 2022-09-28

### Updated

- Deprecated `initContainer.image` and `initContainer.tag`.  Init container now uses the mysql image from Iron Bank.

## [0.0.9-bb.1] - 2022-09-28

### Updated

- Updated mysql to 9.3.4

## [0.0.9-bb.0] - 2022-08-10

### Updated

- Image updated for MySql Chart archive from `9.2.5` to `9.2.6`

## [0.0.8-bb.0] - 2022-08-09

### Updated

- Image updated for ssc to `22.1.2.0004`
- Image updated for MySql Chart archive from `9.2.1` to `9.2.5`

## [0.0.7-bb.0] - 2022-07-21

### Updated

- Image updated for ssc to `22.1.1.0006`
- Image updated for MySql Chart archive from `9.1.7` to `9.2.1`

## [0.0.6-bb.0] - 2022-06-16

### Updated

- Image updated for ssc to `22.1.0.0149`
- Image updated for MySql to `8.0.29-debian-10-r37` (NOTE: there is an IB issue with `8.0.29` tag, must use the debian-10 version)

## [0.0.5] - 2022-03-04

### Updated

- Renovate updated the ssc image to 21.2.2.0002

## [0.0.4] - 2022-02-01

### Fixed

- Pinned to OpenJDK 13 keystore init container as default
- Modified readiness check to HTTP
- Added `values.yaml` option to remove runAsRootGroup
- Update MySQL image to latest Ironbank
- Update keytool cmd to include keyalg

## [0.0.3] - 2021-11-23

### Fixed

- Patch helm chart issues.
  - Add hash to JDK image tag reference. Prevent keytool cmd failure
  - Add tomcat config to set https headers. Fixes SSO SAML auth flow
  - Allow configuration for keystore alias
  - Generate README.md via helm-docs

## [0.0.2] - 2021-11-01

### Added

- Update Helm chart.
  - Removed init-seed data in favor of database-migration flag in autoconfig
  - Add init-container for generating the dummy java-truststore
- Update image version to use Ironbank's SSC 21.1.2.0005

## [0.0.1] - Initial version

### Added

- Initial version
