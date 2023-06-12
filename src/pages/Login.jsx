import React from 'react';
import styles from '../styles/registerLogin.module.css';
import { Link } from 'react-router-dom';

const Login = () => {


  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    
    // console.log('Logged in:', email, password);
  };

  return (
    <div className={styles.registerLoginBody}>
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
          <div className={styles.signinSignup}>
            <form action="" className={styles.signInForm} id="login-form" autoComplete="off">
              <h2 className={styles.title}>Sign in to Travely</h2>
              <div className={styles.inputField}>
                <i className="fas fa-user"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className={styles.inputField}>
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className={styles.forgetPasswordLink}>
                <p className={styles.forgetPasswordLinkText}>
                  <Link to="/forgetPassword" href="password-reset.html">Forget Password?</Link>
                </p>
              </div>

              <input onClick={handleLogin} type="submit" value="Login" className={`${styles.btn} ${styles.solid}`}/>
              
              <p className={styles.socialText}>Or Sign in With</p>
              <div className={styles.socialMedia}>
                <a href="country.html" className={styles.socialIcon}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="country.html" className={styles.socialIcon}>
                  <i className="fab fa-google"></i>
                </a>
              </div>
              <div className={styles.signinSignupLink}>
                <p className={styles.signinSignupText}>
                  Don't have an account? &nbsp;
                  <Link to="/register">Sign up</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.panelsContainer}></div>
        <div className={styles.panelsTopContainer}></div>
      </div>
      <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
    </div>
  )
}

export default Login