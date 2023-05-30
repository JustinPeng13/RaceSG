import { useRouter } from "next/router";
import { useEffect } from "react";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulating logout logic
    // Replace this with your actual logout logic
    const logout = async () => {
      // Perform logout actions (e.g., clearing session, token, etc.)
      // ...

      // Redirect to the login page after logout
      router.push("/");
    };

    logout();
  }, [router]);

  return (
    <div>
      <h1>Logging Out...</h1>
    </div>
  );
};

export default LogoutPage;
