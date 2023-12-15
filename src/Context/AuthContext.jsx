import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../Config/Firebase";

export let AuthContext = createContext();
export default function AuthContextProvider(props) {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
    console.log(auth);
  };
  const [userData, setUserData] = useState(null);
  let requestHeader = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };
  let baseUrl = "https://upskilling-egypt.com/api/v1";
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };

    // if (localStorage.getItem("userToken")) {
    //   saveUserData();
    // }
  }, []);

  let saveUserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    try {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    } catch (error) {
      setUserData(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userData,
        saveUserData,
        requestHeader,
        baseUrl,
        googleSignIn,
        logOut,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export const UserAuth = () => {
  return useContext(AuthContext);
};
