import { useState } from "react";
import axios from "axios";
import Styles from "./ForgotPasswordScreen.module.css";

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

  return (
    <div className={Styles.forgotpasswordScreen}>
      <form
        onSubmit={forgotPasswordHandler}
        className={Styles.forgotpasswordScreen__form}
      >
        <h3 className={Styles.forgotpasswordScreen__title}>Forgot Password</h3>
        {error && <span className={Styles.errorMessage}>{error}</span>}
        {success && <span className={Styles.successMessage}>{success}</span>}
        <div className="form-group">
          <p className={Styles.forgotpasswordScreen__subtext}>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email
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
        <button type="submit" id={Styles.emailBtn} className="btn btn-primary">
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;
