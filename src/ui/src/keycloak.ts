import Keycloak from "keycloak-js";
export const keycloak = new Keycloak({
  url: "http://localhost:18080/auth",
  realm: "camunda-platform",
  clientId: "b1f8e2ba-4002-4b07-9106-1871a90e439f",
});
