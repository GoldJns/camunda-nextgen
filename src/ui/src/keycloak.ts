import Keycloak from "keycloak-js";
export const keycloak = new Keycloak({
  url: "http://localhost:8080/auth",
  realm: "Keycloak-react-auth",
  clientId: "React-auth",
});
