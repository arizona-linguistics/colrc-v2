import React from "react";
import { Button } from "../components/AuthForm";
import { useAuth } from "../context/auth";
import { broadCastSuccess } from '../utils/messages'

function Admin(props) {
  const { setAuthTokens } = useAuth();

  function logOut() {
    setAuthTokens();
    broadCastSuccess(`Logged Out`)
  }

  return (
    <div>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </div>
  );
}

export default Admin;