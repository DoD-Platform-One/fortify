# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
