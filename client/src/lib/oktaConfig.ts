//all the configuration details from developer.okta.com
export const oktaConfig = {
    clientId: "0oa9ps8q47mUOWKPw5d7",
    issuer: "https://dev-33635103.okta.com/oauth2/default",
    redirectUri :"http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck:true
}