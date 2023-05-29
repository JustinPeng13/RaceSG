import { useState } from "react";
import Link from "next/link";

export default function Home() {
  // State variable to keep track of the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

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
