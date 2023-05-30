import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/welcome.json";
import { useRouter } from "next/router"

type UserInfoRes = {
  sub?: string;
  userInfo?: Record<string, string>;
  state?: string;
};

const LoggedIn = () => {
  const [data, setData] = useState<UserInfoRes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const redirect = async () => {
    setTimeout(() => {
      router.push("/map");
    }, 2500);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/userinfo", { credentials: "include" });
        const data = (await res.json()) as UserInfoRes;
        setData(data);
        // sessionStorage.setItem("isLoggedIn", "true")
    
        redirect();
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setIsLoading(false);
      }
    };
    getUserInfo();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Lottie
        animationData={animationData}
        style={{ position: "absolute", zIndex: -1 }}
      />
    </div>
  );
};
export default LoggedIn;
