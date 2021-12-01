# Changelog

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---
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
