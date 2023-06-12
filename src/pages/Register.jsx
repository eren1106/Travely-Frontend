import React from 'react'
import styles from '../styles/register-login.module.css';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  return (
    <div className={styles.container}>
    <div className={styles.formContainer}>
        <div className={`${styles.signinSignUp} ${styles.signUpGroup}`}>
            <form action="" className="" id="register-form" autoComplete="off">
                <h2 className={styles.title}>Sign up to Travely</h2>
                <div className={styles.inputField}>
                    <i><PersonOutlinedIcon/></i>
                    <input type="text" name="username" placeholder="Username" required />
                </div>
                <div className={styles.inputField}>
                    <i><MailOutlinedIcon/></i>
                    <input type="email" name="email" placeholder="Email" required />
                </div>
                <div className={styles.inputField}>
                    <i><LockOutlinedIcon/></i>
                    <input type="password" name="password" placeholder="Password" required />
                </div>
                <div className={styles.inputField}>
                    <i><LockOutlinedIcon/></i>
                    <input type="password" name="confirm-password" placeholder="Confirm Password" required />
                </div>
                <input type="submit" value="Register" className={`${styles.btn} ${styles.solid}`} id="sign-up-btn" />
                <p className={styles.socialText}>Or Sign up With</p>
                <div className={styles.socialMedia}>
                    <a href="#" className={styles.socialIcon}>
                        <i><FacebookOutlinedIcon/></i>
                    </a>
                    <a href="#" className={styles.socialIcon}>
                        <i><GoogleIcon/></i>
                    </a>
                </div>
                <div className={styles.signinSignupLink}>
                    <p className={styles.signinsignupText}>
                        Already have an account? &nbsp;
                        <a href="login.html">Sign in</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
    <div className={styles.panelsContainer}></div>
    <div className={styles.panelsTopContainer}></div>
</div>
  )
}

export default Register