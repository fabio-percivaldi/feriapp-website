import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button className="orange-button auth-button" onClick={() => loginWithRedirect()}>Login</Button>
};

export default LoginButton;