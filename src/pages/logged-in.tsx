import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/welcome.json";

type UserInfoRes = {
  sub?: string;
  userInfo?: Record<string, string>;
  state?: string;
};

const LoggedIn = () => {
  const [data, setData] = useState<UserInfoRes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/userinfo", { credentials: "include" });
        const responseText = await res.text();
        console.log(responseText);
        const data = JSON.parse(responseText) as UserInfoRes;
        setData(data);
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
    <Lottie
      animationData={animationData}
      style={{ position: "absolute", zIndex: -1 }}
    />
  );
};
export default LoggedIn;
