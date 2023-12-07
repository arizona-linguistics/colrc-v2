import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";
import { intersectionWith, isEqual } from "lodash";
import { path_role_permissions } from "./access/permissions";

function PrivateRoute({ component: Component, ...rest }) {
  const { authTokens, user } = useAuth();

  // if (user) {
  //   console.log('roles', user.roles)
  //   console.log(rest.path)
  //   console.log(path_role_permissions[rest.path])
  //   console.log(intersectionWith(path_role_permissions[rest.path], user.roles, isEqual))
  // } else {
  //   console.log("User does not exist")
  // }

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens &&
        user &&
        intersectionWith(path_role_permissions[rest.path], user.roles, isEqual)
          .length >= 1 ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { referer: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
