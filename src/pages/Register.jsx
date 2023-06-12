import React from 'react';
import '../styles/register-login.css';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div class="container">
            <div class="forms-container">
                <div class="signin-signup sign-up-group">
                    <form action="" class="" id="register-form" autocomplete="off">
                        <h2 class="title">Sign up to Travely</h2>
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="text" name="username" placeholder="Username" required />
                        </div>
                        
                        <div class="input-field">
                            <i class="fas fa-user"></i>
                            <input type="email" name="email" placeholder="Email" required />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="password" placeholder="Password" required />
                        </div>
                        <div class="input-field">
                            <i class="fas fa-lock"></i>
                            <input type="password" name="confirm-password" placeholder="Confirm Password" required />
                        </div>
                        <input type="submit" value="Register" class="btn solid" id="sign-up-btn" />
                        <p class="social-text">Or Sign up With</p>
                        <div class="social-media">
                            <a href="#" class="social-icon">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" class="social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                        </div>
                        <div class="signin-signup-link">
                            <p class="signin-signup-text">
                                Already have an account? &nbsp;
                                <a href="login.html">Sign in</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div class="panels-container"></div>
            <div class="panels-top-container"></div>
        </div>
  )
}

export default Register