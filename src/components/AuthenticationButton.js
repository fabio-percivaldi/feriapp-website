import React from "react";

import LoginButton from "./Login";
import UserProfile from "./UserProfile"

import { useAuth0 } from "@auth0/auth0-react";

const AuthenticationButton = (props) => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <UserProfile location={props.location} /> : <LoginButton />;
};

export default AuthenticationButton;