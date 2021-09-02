import React from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { NODE_ENV } = process.env
  const redirectLocation = NODE_ENV === 'development' ? '/holidays' : '/bridges/holidays'
  return <Button className="orange-button auth-button" onClick={() => logout({ returnTo: `${window.location.origin}${redirectLocation}` })}>Logout</Button>
};

export default LogoutButton;