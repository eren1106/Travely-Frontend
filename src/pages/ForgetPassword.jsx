import React, { useState } from 'react'
import styles from '../styles/registerLogin.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CountdownTimer from '../components/CountDownTimer';

const ForgetPassword = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  const handlePasswordReset = async (data) => {
    if(data && data.newPassword && data.newPassword.length < 6){
      setErrorMessage("Error: Password must exceed length of 6!");
    }else if(data.newPassword !== data.confirmPassword){
      setErrorMessage("Error: Passwords do not match!");
    }else{
      try {
        const response = await axios.post('http://localhost:3001/api/auth/reset', data);
        // Perform password reset logic
        console.log('Password reset form submitted:', data);
        alert("Reset password successfully! Please login again!");
        navigate('/login');
      } catch (error) {
        // Handle error response
        console.log("error occurs!");
        if (error.response && error.response.data) {
          setErrorMessage("Error: " + error.response.data);
        } else {
          setErrorMessage('An error occurred. Please try again later.');
        }
        // console.error(error.response.data);
      }
    }
  };

  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    console.log("email changed: " + e.target.value);
    setEmail(e.target.value);
  };


  return (
    <div className={styles.registerLoginBody}>
        <div className={styles.loginContainer}>
            <div className={styles.formContainer}>
                <div className={styles.signinSignup}>
                    <form onSubmit={handleSubmit(handlePasswordReset)} className={styles.signInForm} id="password-reset-form" autoComplete="off">
                        <h2 className={styles.title}>Reset Password</h2>
                        <div className={styles.inputField}>
                            <i><MailOutlinedIcon/></i>
                            <input type="text" onInput={handleEmailChange} {...register('email')} placeholder="Email" required />
                        </div>
                        <div className={styles.inputField}>
                            <i><LockOutlinedIcon/></i>
                            <input type="password" {...register('newPassword')} placeholder="New Password" required />
                        </div>
                        <div className={styles.inputField}>
                            <i><LockOutlinedIcon/></i>
                            <input type="password" {...register('confirmPassword')} placeholder="Confirm Password" required />
                        </div>
                        <div className={`${styles.inputField} ${styles.verification}`}>
                            <i><LockOutlinedIcon/></i>
                            <input type="text" {...register('code')} placeholder="Email Verification Code" required />
                            <CountdownTimer email={email}/>
                            {/* <CountdownTimer/> */}
                        </div>
                        <div className={styles.backToLoginLink}>
                          <p className={styles.backToLoginLinkText}>
                            <Link to="/login">Back to Login</Link>
                          </p>
                        </div>
                        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                        <input type="submit" value="Reset" className={`${styles.btn} ${styles.solid}`} />
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

export default ForgetPassword