import React from "react";
import styles from '../styles/register-login.module.css';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  return (
    <body>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.signinSignUp}>
            <form
              action=""
              //className={styles.sign-in-form}
              id="login-form"
              autocomplete="off"
            >
              <h2 className={styles.title}>Sign in to Travely</h2>
              <div className={styles.inputField}>
                <i><MailOutlineIcon /></i>
                <input type="email" name="email" placeholder="Email" required />
              </div>
              <div className={styles.inputField}>
                <i><LockOutlinedIcon /></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="forgetPasswordLink">
                <p className="forgetPasswordLinkText">
                  <a href="password-reset.html">Forget Password?</a>
                </p>
              </div>

              <input type="submit" value="Login" className={styles.btn} />

              <p className={styles.socialText}>Or Sign in With</p>
              <div className={styles.socialMedia}>
                <a href="country.html" className={styles.socialIcon}>
                  <i><FacebookOutlinedIcon /></i>
                </a>
                <a href="country.html" className={styles.socialIcon}>
                  <i><GoogleIcon /></i>
                </a>
              </div>
              <div className={styles.signinsignupLink}>
                <p className={styles.signinsignupText}>
                  Don't have an account? &nbsp;
                  <a href="register.html">Sign up</a>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.panelsContainer}></div>
        <div className={styles.panelsTopContainer}></div>
      </div>
    </body>
  );
};

export default Login;
