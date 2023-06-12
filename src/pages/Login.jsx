import React from 'react';
import '../styles/register-login.css';
import { Link } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    
    console.log('Logged in:', email, password);
  };

  return (
    <div className="container">
      <div classNameName="forms-container">
        <div classNameName="signin-signup">
          <form action="" className="sign-in-form" id="login-form" autocomplete="off">
            <h2 className="title">Sign in to Travely</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="forget-password-link">
              <p className="forget-password-link-text">
                <Link to='/forgetPassword' href="password-reset.html">Forget Password?</Link>
              </p>
            </div>

            <input onClick={handleLogin} type="submit" value="Login" className="btn solid" />
            
            <p className="social-text">Or Sign in With</p>
            <div className="social-media">
              <a href="country.html" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="country.html" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
            </div>
            <div className="signin-signup-link">
              <p className="signin-signup-text">
                Don't have an account? &nbsp;
                <a href="register.html">Sign up</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container"></div>
      <div className="panels-top-container"></div>
    </div>
  )
}

export default Login