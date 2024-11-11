"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_1 = require("@react-keycloak/web");
var PrivateRoute = function (_a) {
    var children = _a.children;
    var keycloak = (0, web_1.useKeycloak)().keycloak;
    var isLoggedIn = keycloak.authenticated;
    return isLoggedIn ? children : null;
};
exports.default = PrivateRoute;
