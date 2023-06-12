import React from 'react'
import styles from '../styles/registerLogin.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const handlePasswordReset = async (data) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/resetPassword', data);
      console.log("reset password successfully!");
      console.log(response.data);
      // Perform password reset logic
      console.log('Password reset form submitted:', data);
      alert("Password reset successfully! Please login again!");
      navigate('/login');
    } catch (error) {
      // Handle error response
      console.log("error occurs!");
      // console.error(error.response.data);
    }
  };


  return (
    <div className={styles.registerLoginBody}>
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <div className={styles.signinSignup}>
                    <form onSubmit={handleSubmit(handlePasswordReset)} className={styles.signInForm} id="password-reset-form" autocomplete="off">
                        <h2 className={styles.title}>Reset Password</h2>
                        <div className={styles.inputField}>
                            <i className="fas fa-user"></i>
                            <input type="text" {...register('email')} placeholder="Email" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-lock"></i>
                            <input type="password" {...register('newPassword')} placeholder="New Password" required />
                        </div>
                        <div className={styles.inputField}>
                            <i className="fas fa-lock"></i>
                            <input type="password" {...register('confirmPassword')} placeholder="Confirm Password" required />
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