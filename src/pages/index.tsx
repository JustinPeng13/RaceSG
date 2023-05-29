import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { app } from "../../firebaseConfig";
import { getDatabase, ref, push } from "firebase/database";

const db = getDatabase(app);

export default function Home() {
  // State variable to keep track of the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Read the value of the isLoggedIn cookie on component mount
  useEffect(() => {
    const isLoggedIn = getCookie("isLoggedIn") === "true";
    setIsLoggedIn(isLoggedIn);
  }, []);

  console.log(process.env.NODE_ENV);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <div>Welcome back!</div>
        </>
      ) : (
        <>
          <div>Please log in.</div>
        </>
      )}
    </div>
  );
}
