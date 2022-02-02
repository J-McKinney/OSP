import { useState, useEffect } from "react";
import axios from "axios";
import anime from "animejs";
import { Link } from "react-router-dom";
import Styles from "./LoginScreen.module.css";
import "../animatedBG.css";

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

  useEffect(() => {
    const animateBlocks = () => {
      let container = document.querySelector(".BGContainer");
      for (var i = 0; i <= 40; i++) {
        let blocks = document.createElement("div");
        blocks.classList.add("block");
        container.appendChild(blocks);
      }

      anime({
        targets: ".block",
        translateX: function () {
          return anime.random(-700, 700);
        },
        translateY: function () {
          return anime.random(-300, 300);
        },
        scale: function () {
          return anime.random(1, 4);
        },
        easing: "linear",
        duration: 1000,
        boxShadow: function () {
          return "10px 10px 50px rgba(0, 0, 0, 0.6)";
        },
        delay: anime.stagger(200),
      });
    };
    animateBlocks();
  }, []);

  return (
    <>
      <div className="BGWrapper">
        <div className="BGContainer">
          <div className={Styles.loginScreen}>
            <form onSubmit={loginHandler} className={Styles.loginScreen__form}>
              <h2 className={Styles.loginScreen__title}>OS Products</h2>
              <h4 className={Styles.loginScreen__title}>Login</h4>
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
              <button
                id={Styles.loginBtn}
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
              <span className={Styles.loginScreen__subtext}>
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
