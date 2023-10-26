# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
