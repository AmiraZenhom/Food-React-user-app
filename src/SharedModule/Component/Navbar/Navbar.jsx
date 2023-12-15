//import React from 'react'

import { Link } from "react-router-dom";
import { UserAuth } from "../../../Context/AuthContext";

export default function Navbar({ userData }) {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <>
      {user?.displayName ? (
        <button onClick={handleSignOut}>Logout</button>
      ) : (
        <Link to="/login">Sign in</Link>
      )}
    </>
  );
}
