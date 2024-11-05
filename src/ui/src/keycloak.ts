import Keycloak from "keycloak-js";
export const keycloak = new Keycloak({
  url: "http://localhost:18080/auth",
  realm: "camunda-platform",
  clientId: "7513f28f-4e0f-46ce-8251-1c62ad96cc751",
});
