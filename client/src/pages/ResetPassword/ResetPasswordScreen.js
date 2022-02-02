import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import anime from "animejs";
import Styles from "./ResetPasswordScreen.module.css";
import "../animatedBG.css";

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      console.log(data);
      setSuccess(data.data);
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
          <div className={Styles.resetpasswordScreen}>
            <form
              onSubmit={resetPasswordHandler}
              className={Styles.resetpasswordScreen__form}
            >
              <h3 className={Styles.resetpasswordScreen__title}>
                Forgot Password
              </h3>
              {error && <span className="error-message">{error} </span>}
              {success && (
                <span className="success-message">
                  {success} <Link to="/login">Login</Link>
                </span>
              )}
              <div className="form-group">
                <label htmlFor="password">New Password:</label>
                <input
                  type="password"
                  required
                  id="password"
                  placeholder="Enter new password"
                  autoComplete="true"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm New Password:</label>
                <input
                  type="password"
                  required
                  id="confirmpassword"
                  placeholder="Confirm new password"
                  autoComplete="true"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordScreen;
