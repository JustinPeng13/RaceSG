import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

type FormType = "Locals" | "Tourists";


export default function AuthPage() {
  const [formType, setFormType] = useState<FormType>("Locals");
  const [showFields, setShowFields] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTabClick = (type: FormType) => {
    setFormType(type);
    setShowFields(false);
  };

  const handleSignUpClick = () => {
    setShowFields(true);
    setIsSignUp(true);
  };

  const handleLoginClick = () => {
    setShowFields(true);
    setIsSignUp(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("../api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Account created successfully:", data);
      } else {
        console.error(
          "Error creating account:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            formType === "Locals" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Locals")}
        >
          Locals
        </button>
        <button
          className={`${styles.tab} ${
            formType === "Tourists" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Tourists")}
        >
          Tourists
        </button>
      </div>
      <h2>{formType}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {formType === "Locals" && (
          <>
            <br />
            <Link href={`/login`}>
              <button className={styles.button}>Login with Singpass app</button>
            </Link>
            <br />
          </>
        )}
        {formType === "Tourists" && !showFields && (
          <>
            <br />
            <button className={styles.button} onClick={handleSignUpClick}>
              Sign Up
            </button>
            <br />
            <button className={styles.button} onClick={handleLoginClick}>
              Login
            </button>
            <br />
          </>
        )}
        {formType === "Tourists" && showFields && (
          <>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleEmailChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlePasswordChange}
            />
            <br />
            {isSignUp && (
              <>
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleConfirmPasswordChange}
                />
                <br />
              </>
            )}

            <br />
          </>
        )}
        {showFields && <input type="submit" value="Submit" />}
      </form>
    </div>
  );
}
