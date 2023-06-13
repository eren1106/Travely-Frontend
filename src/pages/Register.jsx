import React, { useState } from 'react';
import styles from '../styles/registerLogin.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import GoogleLogin from "./GoogleLogin";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { handleSubmit, register, watch, formState: { errors } } = useForm();

  const handleRegister = async (data) => {
      if(data && data.password && data.password.length < 6){
        setErrorMessage("Error: Password must exceed length of 6!");
      }else if(data.password !== data.confirmPassword){
        setErrorMessage("Error: Passwords do not match!");
      }else{
          try {
              const response = await axios.post('http://localhost:3001/api/auth/register', data);
              console.log('Registration successful!');
              console.log(response.data);
              // Continue with register logic
              navigate('/');
          } catch (error) {
              // Handle error response
              console.error('Registration failed!');
              if (error.response && error.response.data) {
                setErrorMessage("Error: " + error.response.data);
              } else {
                setErrorMessage('An error occurred. Please try again later.');
              }
              // console.error(error.response.data);
          }
      }
  };

  return (
    <div className={styles.registerLoginBody}>
        <div className={styles.loginContainer}>
                <div className={styles.formContainer}>
                    <div className={`${styles.signinSignup} ${styles.signUpGroup}`}>
                        <form onSubmit={handleSubmit(handleRegister)} id="register-form" autoComplete="off">
                            <h2 className={styles.title}>Sign up to Travely</h2>
                            <div className={styles.inputField}>
                              <i><PersonOutlinedIcon/></i>
                                <input
                                type="text"
                                {...register('username')}
                                placeholder="Username"
                                required />
                            </div>
                            
                            <div className={styles.inputField}>
                              <i><MailOutlinedIcon/></i>
                                <input type="email" {...register('email')} placeholder="Email" required />
                            </div>
                            <div className={styles.inputField}>
                              <i><LockOutlinedIcon/></i>
                                <input 
                                type="password" 
                                {...register('password')}
                                placeholder="Password" 
                                required 
                                />
                                {errors.password && <span>Password is required</span>}
                            </div>
                            <div className={styles.inputField}>
                              <i><LockOutlinedIcon/></i>
                                <input type="password" {...register('confirmPassword')} placeholder="Confirm Password" required />
                            </div>
                            
                            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                            <input type="submit" value="Register" className={`${styles.btn} ${styles.solid}`} id="sign-up-btn" />
                            <p className={styles.socialText}>Or Sign up With</p>
                            
                            <div className={styles.socialMedia}>
                                <a href="#" className={styles.socialIcon}>
                                    <i><FacebookOutlinedIcon/></i>
                                </a>
                                {/* <button href="#" className={styles.socialIcon}>
                                    <i><GoogleIcon/></i>
                                </button> */}
                                <GoogleLogin />
                            </div>
                            <div className={styles.signinSignupLink}>
                                <p className={styles.signinSignupText}>
                                    Already have an account? &nbsp;
                                    <Link to="/login">Sign in</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={styles.panelsContainer}></div>
                <div className={styles.panelsTopContainer}></div>
                
            </div>
            {/* <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script> */}
        </div>
  )
}

export default Register