# Fortify App


## Pre Deployment Configuration

* How to create java keystore?
  * you need to create pkcs12 java keystore add certificate and key using openssl.
    
    * ```bash
      openssl pkcs12 -export -in <client-cert.pem> -inkey <client-key.pem> -out fortify-keystore.jks -name <Alias Name>
      ```
    
  * Validate certs in keystore
  
    * ```bash
      keytool -list -v -keystore fortify-keystore.jks
      ```

## Post Install Configuration

* **Prerequesites:**

  * Keycloak is avaliable to fortify

    * Make sure you configurre valid redirect URL to

      `https://${FORTIFY_URL}/saml/SSO/alias/`

    * Make sure you configure valid logout URL 

    * `saml_single_logout_service_url_post`: `http://`${FORTIFY_URL}/saml/SingleLogout/alias/ssc`

  * Keycloak relm metadata is avaliable from keycloack. to verify please try follow below steps
    * `curl https://${KEYCLOAK_DNS}/auth/realms/${REALM_NAME}/protocol/saml`
    * with above command you should get a `200` response and also xml file with data to connec to IDP(Identity Provider(Keycloak))
    
  * Keystore password
    * secret name ref: 
      * Name: `fortify-secret`
      * Data: `httpCertificateKeystorePassword`
    
  * Cerificate password
    * secret name ref: 
      * Name: `fortify-secret`
      * Data: `httpCertificateKeyPassword`

* **Post Configuration:**

  * Login into fortify web UI using default user credentails `username/password: admin/admin`. It will promt you to update your password immediately.

    ![initial_login](docs/images/initial_login.png)

    

  * Complete login with new credentails

  * Now you need to setup SSO with SAML

  * Navigate to administration page and select configuration on left sidebar on the administration page.

    ![admin_config](docs/images/admin_config.png)
  
  * Select SSO in the configuration section, It will show a drop down menu for SSO options.

    ![admin_configuration](docs/images/admin_configuration.png)

  * From the drop down select SAML, by default most of the values are populated already.

    ![saml_sso_option](docs/images/saml_sso_option.png)

  * set the keystore password and signing and encryption key.

    ![fortify_saml_config](docs/images/fortify_saml_config.png)

  * Save the config.

  * Now go to argocd and kill the fortify pod.( Note: Just kill the pod to restart service and wait for approx:3 min).

    ![fortify_argo_deployment](docs/images/fortify_argo_deployment.png)

    ![reload_fortify](docs/images/reload_fortify.png)

  * Now try to access your fortify URL, it will redirect back to keycloak.
