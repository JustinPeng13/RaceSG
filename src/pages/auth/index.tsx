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
  const [passwordMatch, setPasswordMatch] = useState(true);

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
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic here
    // You can access the entered values using 'password' and 'confirmPassword' states
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
      <form className={styles.form}>
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
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
            />
            <br />
          </>
        )}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
