import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Styles from "./LoginScreen.module.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={Styles.loginScreen}>
      <form onSubmit={loginHandler} className={Styles.loginScreen__form}>
        <h3 className={Styles.loginScreen__title}>Login</h3>
        {error && <span className={Styles.errorMessage}>{error}</span>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            className={Styles.emailEntry}
            type="email"
            required
            id="email"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            tabIndex={1}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:{" "}
            <Link
              to="/forgotpassword"
              className={Styles.loginScreen__forgotpassword}
            >
              Forgot Password?
            </Link>
          </label>
          <input
            className={Styles.passwordEntry}
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            tabIndex={2}
          />
        </div>
        <button id={Styles.loginBtn} type="submit" className="btn btn-primary">
          Login
        </button>

        <span className={Styles.loginScreen__subtext}>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;
