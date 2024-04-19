# How to upgrade the Fortify Package chart

BigBang makes modifications to the upstream helm chart. The full list of changes is at the end of  this document.

Notes:

* This is the Fortify Software Security Center (SSC). You can find additional info on [the official Fortify SSC documentation](https://www.microfocus.com/documentation/fortify-software-security-center/).

* [List of Fortify SSC Releases](https://github.com/fortify/helm3-charts/releases?q=ssc&expanded=true)

* In the context of this document and repo Fortify and Fortify SSC are often used interchangeably.

---

1. Find the current and latest release notes from the [documentation](https://www.microfocus.com/documentation/fortify-software-security-center/). Be aware of changes that are included in the upgrade. Take note of any manual upgrade steps that customers might need to perform, if any.
1. Do diff of [upstream chart](https://github.com/fortify/helm3-charts/tree/main/charts/ssc) between old and new release tags to become aware of any significant chart changes. A graphical diff tool such as [Meld](https://meldmerge.org/) is useful. You can see where the current helm chart came from by inspecting `/chart/kptfile` or for an easier way to see the changes skip forward to the KPT instructions.
1. Create a development branch and merge request from the Gitlab issue.
1. Merge/Sync the new helm chart with the existing Fortify package code. A graphical diff tool like [Meld](https://meldmerge.org/) is useful. Reference the "Modifications made to upstream chart" section below. Be careful not to overwrite Big Bang Package changes that need to be kept. Note that some files will have combinations of changes that you will overwrite and changes that you keep. Stay alert. The hardest file to update is the `/chart/values.yaml` because the changes are many and complicated.
    1. An easy way to do this is with KPT
        ```bash
        kpt pkg update chart@FIND_YOUR_UPSTREAM_VERSION_NUMBER --strategy force-delete-replace
        ```
    1. Then to reduce the number of changes you have to work through run the following:
        ```bash
        git checkout chart/templates/bigbang/
        git checkout chart/tests/
        git checkout chart/templates/tests/
        git checkout chart/charts/
        git checkout chart/Chart.lock
        git checkout chart/Chart.yaml
        git checkout chart/templates/script-configmap.yaml
        git checkout chart/templates/secrets.yaml
        git checkout chart/templates/tomcat-configmap.yaml
        ```
1. In `/chart/Chart.yaml` update the gluon library to the latest version.
1. Run a helm dependency command to update the chart/charts/*.tgz archives and create a new requirements.lock file. You will commit the tar archives along with the requirements.lock that was generated.
    ```bash
    helm dependency update ./chart
    ```
1. In `/chart/values.yaml` update image.tag to the new version. Renovate might have arleady done this for you. Also update the `dev.bigbang.mil/applicationVersions`
   ```
     dev.bigbang.mil/applicationVersions: |
    - Fortify: 23.2.0.0154
   ```
1. Revert some settings in `chart/templates/webapp.yaml`:
Increase Readiness Probe times and use HTTP vs HTTPS:
   ```
    readinessProbe:
      initialDelaySeconds: 120
      periodSeconds: 30
      httpGet:
        path: "{{ $urlPathPrefix }}/images/favicon.ico"
        port: http-web
        scheme: HTTP
   ```
Disable SECURE TRANSPORT
   ```
      - name: COM_FORTIFY_SSC_ENFORCESECURETRANSPORT
        value: "false"
   ```
Revert Volumes and Mountpaths. These have change to automated the start up process of generating Keys
   ```
             volumeMounts:
            - name: shared
              readOnly: true
              mountPath: "/app/secrets"
            - name: persistent-volume
              mountPath: "/fortify"
            - mountPath: /app/tomcat/conf/server-tpl.xml
              subPath: server-tpl.xml
              name: tomcat-template
            - name: etc-volume
              mountPath: "/app/etc"
...
      volumes:
        - name: secrets-volume
          secret:
            {{- if not .Values.databaseSecret.use_secret }}
            secretName: {{ include "ssc.fullcomponentname" (merge (dict "component" "secret") . ) }}
            {{- else }}
             secretName: {{ required "The secretRef.name config value is required!" .Values.secretRef.name }}
            {{- end }}
        - name: persistent-volume
          persistentVolumeClaim:
            claimName: {{ include "ssc.fullcomponentname" (merge (dict "component" "pvc") . ) }}
        - name: shared
          emptyDir: {}
        - name: keystore-script
          configMap:
            name: {{ include "ssc.fullcomponentname" (merge (dict "component" "keystore-script") . ) }}
        - name: tomcat-template
          configMap:
            name: {{ include "ssc.fullcomponentname" (merge (dict "component" "tomcat-template") . ) }}
        - name: etc-volume
          emptyDir:
            medium: Memory
            sizeLimit: 1Mi
```
1. Update /CHANGELOG.md with an entry for "upgrade Fortify to app version X.X.X chart version X.X.X-bb.X". Or, whatever description is appropriate.
1. Update the /README.md following the [gluon library script](https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/blob/master/docs/bb-package-readme.md)
1. Update /chart/Chart.yaml to the appropriate versions. The annotation version should match the `appVersion`.
    ```yaml
    version: X.X.X-bb.X
    appVersion: X.X.X.X
    annotations:
      bigbang.dev/applicationVersions: |
        - Fortify: 23.1.2.0005
    ```
SecurityContext should pull from values
   ```
  securityContext:
    allowPrivilegeEscalation: false
    {{- toYaml .Values.containerSecurityContext | nindent 12 }}
    readOnlyRootFilesystem: true
```
Add InitContainer:
```
```
1. Update /chart/Chart.yaml `annotations."helm.sh/images"` section to fix references to updated packages (if needed)
1. Use a development environment to deploy and test Fortify. See more detailed testing instructions below. Also test an upgrade by deploying the old version first and then deploying the new version.
1. When the Package pipeline runs expect the cypress tests to fail due to UI changes.
1. Update the /README.md again if you have made any additional changes during the upgrade/testing process.
1. Revert changes to `chart/Values.yaml`
  ```
  repositoryPrefix: "registry1.dso.mil/ironbank/microfocus/fortify/"
  # buildNumber: "" (this way it pulls from Chart.appVersion)
  ```


# Testing a new Fortify version

1. Create a k8s dev environment. One option is to use the Big Bang [k3d-dev.sh](https://repo1.dso.mil/platform-one/big-bang/bigbang/-/tree/master/docs/developer/scripts) with no arguments which will give you the default configuration. The following steps assume you are using the script.
1. Follow the instructions at the end of the script to connect to the k8s cluster and install flux.
1. Deploy Fortify with these dev values overrides. Core apps are disabled for quick deployment.
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
      trust_store_password: dsoppassword
      key_store_password: dsoppassword
      key_store_cert_password : dsoppassword
      fortify_autoconfig: |
        # Need a license to use autoconfig
      fortify_license: |
        <License>
    ```
More SecurityContext
    ```
      {{- if .Values.securityContext.enabled }}
      securityContext: {{- omit .Values.securityContext "enabled" | toYaml | nindent 8 }}
      {{- end }}
    ```
1. Access Fortify UI from a browser (whatever you put in your hosts file) and login with `admin` `admin`
1. You should get asked for a license which we don't have.

# Modifications made to upstream chart
This is a high-level list of modifications that Big Bang has made to the upstream helm chart. You can use this as as cross-check to make sure that no modifications were lost during the upgrade process.

##  chart/charts/*.tgz
- run `helm dependency update ./chart` and commit the downloaded archives
- commit the tar archives that were downloaded from the helm dependency update command. And also commit the requirements.lock that was generated.

## chart/templates/bigbang/*
- add istio virtual service
- add networkpolicies
- add istio peerauthentications

## chart/templates/tests/*
- add templates for CI helm tests

## chart/templates/*.yaml
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

## chart/tests/*
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
    keystoreImage: registry1.dso.mil/ironbank/google/golang/golang-1.20
    keystoreTag: 1.20.11
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
      image: "registry1.dso.mil/bigbang-ci/gitlab-tester:0.0.4"
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
