import { useEffect, useState } from "react";

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
        const data = (await res.json()) as UserInfoRes;
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
    <div>
      <div>User Info</div>
      
      {data?.sub ? (
        <div>{`sgID: ${data.sub}`}</div>
      ) : null}
      {Object.entries(data?.userInfo ?? {}).map(([field, value]) => (
        <div>{`${field}: ${value}`}</div>
      ))}
      {data?.state ? (
        <div>
          {`Favourite ice cream flavour: ${data.state}`}
        </div>
      ) : null}
    </div>
  );
};

export default LoggedIn;