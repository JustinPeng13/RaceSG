import { useRouter } from "next/router";
import { useEffect } from "react";
import Lottie from "lottie-react";
import logoutAnimationData from "../assets/logout.json";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      console.log("HI")
      const res = await fetch("/api/logout");
      setTimeout(() => {
        router.push("/");
      }, 2500);
    };

    logout();
    sessionStorage.removeItem("isLoggedIn")
  });

  return (
    <div
      style={{
        position: "absolute",
      }}
    >
      <Lottie animationData={logoutAnimationData} />
    </div>
  );
};

export default LogoutPage;
