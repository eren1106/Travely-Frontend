import React from 'react'
import styles from '../styles/registerLogin.module.css';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <div className={styles.registerLoginBody}>
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <div className={styles.signinSignup}>
                    <form action="" className={styles.signInForm} id="password-reset-form" autocomplete="off">
                        <h2 className={styles.title}>Reset Password</h2>
                        <div className={styles.inputField}>
                            <i className="fas fa-user"></i>
                            <input type="text" name="email" placeholder="Email" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-lock"></i>
                            <input type="password" name="new-password" placeholder="New Password" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-lock"></i>
                            <input type="password" name="confirm-password" placeholder="Confirm Password" required />
                        </div>
                        <div className={styles.backToLoginLink}>
                          <p className={styles.backToLoginLinkText}>
                            <Link to="/login">Back to Login</Link>
                          </p>
                        </div>
                        <input type="submit" value="Reset" className={`${styles.btn} ${styles.solid}`} />
                    </form>
                </div>
            </div>
            <div className={styles.panelsContainer}></div>
            <div className={styles.panelsTopContainer}></div>
        </div>
        <script src="scripts/password-reset.js"></script>
        <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    </div>
  )
}

export default ForgetPassword