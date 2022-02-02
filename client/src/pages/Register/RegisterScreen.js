import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import anime from "animejs";
import Styles from "./RegisterScreen.module.css";
import "../animatedBG.css";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
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
          <div className={Styles.registerScreen}>
            <form
              onSubmit={registerHandler}
              className={Styles.registerScreen__form}
            >
              <h3 className={Styles.registerScreen__title}>Register</h3>
              {error && <span className="error-message">{error}</span>}
              <div className="form-group">
                <label htmlFor="name">Username:</label>
                <input
                  className={Styles.input}
                  type="text"
                  required
                  id="name"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  className={Styles.input}
                  type="email"
                  required
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  className={Styles.input}
                  type="password"
                  required
                  id="password"
                  autoComplete="true"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password:</label>
                <input
                  className={Styles.input}
                  type="password"
                  required
                  id="confirmpassword"
                  autoComplete="true"
                  placeholder="Confirm password"
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                id={Styles.registerBtn}
                type="submit"
                className="btn btn-primary"
              >
                Register
              </button>

              <span className={Styles.registerScreen__subtext}>
                Already have an account? <Link to="/login">Login</Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
