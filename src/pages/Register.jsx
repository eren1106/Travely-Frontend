import React, { useState } from 'react';
import styles from '../styles/registerLogin.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const { handleSubmit, register, watch, formState: { errors } } = useForm();

    const handleRegister = async (data) => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/register', data);
            console.log('Registration successful!');
            console.log(response.data);
            // Continue with register logic
            navigate('/');
        } catch (error) {
            console.error('Registration failed!');
            console.error(error.response.data);
            // Handle error response
        }
    };

  return (
    <div className={styles.registerLoginBody}>
        <div className={styles.loginContainer}>
                <div className={styles.formContainer}>
                    <div className={`${styles.signinSignup} ${styles.signUpGroup}`}>
                        <form onSubmit={handleSubmit(handleRegister)} id="register-form" autocomplete="off">
                            <h2 className={styles.title}>Sign up to Travely</h2>
                            <div className={styles.inputField}>
                                <i className="fas fa-user"></i>
                                <input
                                type="text"
                                {...register('username')}
                                placeholder="Username"
                                required />
                            </div>
                            
                            <div className={styles.inputField}>
                                <i className="fas fa-user"></i>
                                <input type="email" {...register('email')} placeholder="Email" required />
                            </div>
                            <div className={styles.inputField}>
                                <i className="fas fa-lock"></i>
                                <input 
                                type="password" 
                                {...register('password')}
                                placeholder="Password" 
                                required 
                                />
                                {errors.password && <span>Password is required</span>}
                            </div>
                            <div className={styles.inputField}>
                                <i className="fas fa-lock"></i>
                                <input type="password" name="confirm-password" placeholder="Confirm Password" required />
                            </div>
                            <input type="submit" value="Register" className={`${styles.btn} ${styles.solid}`} id="sign-up-btn" />
                            <p className={styles.socialText}>Or Sign up With</p>
                            <div className={styles.socialMedia}>
                                <a href="#" className={styles.socialIcon}>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className={styles.socialIcon}>
                                    <i className="fab fa-google"></i>
                                </a>
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
            <script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>
        </div>
  )
}

export default Register