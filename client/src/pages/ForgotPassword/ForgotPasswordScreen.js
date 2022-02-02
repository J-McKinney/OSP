import { useState, useEffect } from "react";
import axios from "axios";
import anime from "animejs";
import Styles from "./ForgotPasswordScreen.module.css";
import "../animatedBG.css";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
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
          <div className={Styles.forgotpasswordScreen}>
            <form
              onSubmit={forgotPasswordHandler}
              className={Styles.forgotpasswordScreen__form}
            >
              <h3 className={Styles.forgotpasswordScreen__title}>
                Forgot Password
              </h3>
              {error && <span className={Styles.errorMessage}>{error}</span>}
              {success && (
                <span className={Styles.successMessage}>{success}</span>
              )}
              <div className="form-group">
                <p className={Styles.forgotpasswordScreen__subtext}>
                  Please enter the email address you register your account with.
                  We will send you reset password confirmation to this email
                </p>
                <label htmlFor="email">Email:</label>
                <input
                  className={Styles.emailEntry}
                  type="email"
                  required
                  id="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                id={Styles.emailBtn}
                className="btn btn-primary"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordScreen;
