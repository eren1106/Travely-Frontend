import React, { useState } from 'react';
import styles from '../styles/registerLogin.module.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors }  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', data);
      console.log("login successfully!");
      //console.log(response.data);
      // continue the login logic
      // localStorage.setItem('token', res.data.token);
      // localStorage.setItem('user_id', res.data.id);
      navigate('/');
    } catch (error) {
      // Handle error response
      console.log("error occurs!");
      //alert(error.response.data);
      if (error.response && error.response.data) {
        setErrorMessage("Error: " + error.response.data);
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
      // console.error(error.response.data);
    }
  };


  return (
    <div className={styles.registerLoginBody}>
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
          <div className={styles.signinSignup}>
            <form onSubmit={handleSubmit(handleLogin)} className={styles.signInForm} id="login-form" autoComplete="off">
              <h2 className={styles.title}>Sign in to Travely</h2>
              <div className={styles.inputField}>
                <i><MailOutlinedIcon/></i>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Email"
                  required
                />
              </div>
              <div className={styles.inputField}>
                <i><LockOutlinedIcon/></i>
                <input
                  type="password"
                  {...register('password')}
                  placeholder="Password"
                  required
                />
              </div>
              <div className={styles.forgetPasswordLink}>
                <p className={styles.forgetPasswordLinkText}>
                  <Link to="/forgetPassword" href="password-reset.html">Forget Password?</Link>
                </p>
              </div>
              {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
              <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`}/>
              
              <p className={styles.socialText}>Or Sign in With</p>
              
              <div className={styles.socialMedia}>
                <a href="#" className={styles.socialIcon}>
                  <i><FacebookOutlinedIcon/></i>
                </a>
                <a href="#" className={styles.socialIcon}>
                  <i><GoogleIcon/></i>
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
      {/* <script src="https://kit.fontawesome.com/64d58efce2.js" crossOrigin="anonymous"></script> */}
    </div>
  )
}

export default Login