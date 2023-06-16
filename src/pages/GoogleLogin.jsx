import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import styles from '../styles/registerLogin.module.css';
import GoogleIcon from '@mui/icons-material/Google';

function GoogleLoginModule() {
    const navigate = useNavigate();
    const [ profile, setProfile ] = useState([]);
    const clientId = '604266030904-bh5onf5kh7uc58f0otrs82v3jsttasu2.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
        console.log(res);
        handleGoogleLogin(res.profileObj);
        navigate('/');
    };

    const onFailure = (err) => {
        console.log('failed', err);
        alert("google login failed");
    };

    const logOut = () => {
        setProfile(null);
    };

    const handleGoogleLogin = async (data) => {
        try {
            console.log('Google Login successful!');
            // Continue with register logic
            navigate('/');
        } catch (error) {
            // Handle error response
        }
        
    };

    return (
        
        <GoogleLogin
            className={styles.socialIcon}
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            
            //
            render={renderProps => (
                <button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={styles.socialIcon}>

                    <i><GoogleIcon/></i>
                </button>
                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
            )}
        />
        
    );
}
export default GoogleLoginModule;