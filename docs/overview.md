# Fortify (Customized)

This repository contains a Helm chart to deploy Fortify SSC that has been modified to pass in custom keystores and tomcat configs required for a successful SSO SAML login auth flow.

## Prerequisites

The following items are required before deploying Fortify from this repository:

- A running Kubernetes cluster
- [Helm](https://helm.sh/docs/intro/install/)
- MySQL Database
- Secrets for Fortify and Database

## Quickstart

To get Fortify running quickly, we recommend using the same configuration as our test environment.

Deploy Fortify using the test configuration, but disable Istio:

```bash
# Deploy fortify
helm upgrade -i -n fortify --create-namespace -f ./tests/test-values.yaml --set istio.enabled=false fortify ./chart

```