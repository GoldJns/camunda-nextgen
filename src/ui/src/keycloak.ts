import Keycloak from "keycloak-js";
export const keycloak = new Keycloak({
  url: "http://localhost:18080/auth",
  realm: "camunda-platform",
  clientId: "536d1f48-1b3b-4717-9ed2-069beaa78aa1",
});
