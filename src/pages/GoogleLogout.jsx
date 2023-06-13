import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';

function GoogleLogoutModule() {
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
        navigate('/');
    };

    const onFailure = (err) => {
        console.log('failed', err);
        alert("google login failed");
    };

    const logOut = () => {
        setProfile(null);
    };

    return (
        <GoogleLogout 
            clientId={clientId} 
            buttonText="Log out" 
            onLogoutSuccess={logOut}

            // write customize logout button here
            /*
            render={renderProps => (
                <button 
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={styles.socialIcon}>

                    <i><GoogleIcon/></i>
                </button>
                // <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
            )}
            */
        />
    );
}
export default GoogleLogoutModule;