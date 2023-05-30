import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import welcomeAnimationData from "../assets/welcome.json";
import loginAnimationData from "../assets/login.json";
import redirectAnimationData from "../assets/progressbar.json";
import { useRouter } from "next/router";
import { setUser, getUser } from "../lib/userstore";
import { MouseEvent } from "react";

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
  const [showRedirectAnimation, setShowRedirectAnimation] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    // Handle any additional logic before redirection, if needed
    setShowRedirectAnimation(true);
  };

  useEffect(() => {
    if (showRedirectAnimation) {
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
    }
  }, [showRedirectAnimation]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/userinfo", { credentials: "include" });
        const response = await res.json();

        // Separate the boolean and data from the response
        const { isLoggedIn, ...data } = response;
        console.log(data.userInfo.name);

        setIsLoggedIn(isLoggedIn);
        setUser(data.userInfo.name);
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
  useEffect(() => {
    if (isLoggedIn) {
      const timeout = setTimeout(() => {
        setAnimationVisible(false);
        setTimeout(() => {
          router.push("/locations");
        }, 1000);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, router]);

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
          <Lottie animationData={welcomeAnimationData} />
        </div>
      ) : showRedirectAnimation ? (
        <div
          style={{
            position: "absolute",
          }}
        >
          <Lottie animationData={redirectAnimationData} />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
          }}
          onClick={handleClick}
        >
          <Lottie animationData={loginAnimationData} />
        </div>
      )}
    </div>
  );
}
