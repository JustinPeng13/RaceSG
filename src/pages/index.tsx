import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/welcome.json";
import { useRouter } from "next/router";
import { setUser, getUser } from "../lib/userstore";

type UserInfoRes = {
  sub?: string;
  userInfo?: Record<string, string>;
  state?: string;
};

export default function Home() {
  // State variable to keep track of the user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<UserInfoRes | null>(null);
  const [animationVisible, setAnimationVisible] = useState(true);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/userinfo", { credentials: "include" });
        const response = await res.json();

        // Separate the boolean and data from the response
        const { isLoggedIn, ...data } = response;
        console.log(data.userInfo["myinfo.name"]);

        setIsLoggedIn(isLoggedIn);
        setUser(data.userInfo["myinfo.name"]);
        setData(data);
      } catch (error) {
        console.error(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };
    getUserInfo();
  }, []);

  // Inside the useEffect hook, after setting animationVisible to false:
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     const timeout = setTimeout(() => {
  //       setAnimationVisible(false);
  //       setTimeout(() => {
  //         router.push("/locations"); // Replace "/locations" with your desired URL
  //       }, 1000); // Delay the redirection by 1000 milliseconds (1 second)
  //     }, 3000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [isLoggedIn, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {isLoggedIn ? (
        <div
          style={{
            opacity: animationVisible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            position: "absolute",
            zIndex: -1,
          }}
        >
          <Lottie animationData={animationData} />
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
}
