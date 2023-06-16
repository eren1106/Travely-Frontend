import React, { useState, useEffect } from 'react';
import styles from '../styles/registerLogin.module.css';


function CountdownTimer(props) {
  const { email } = props;
  const [count, setCount] = useState(60);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer;

    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCounting, count]);

  const handleClick = () => {
    console.log("111");
    console.log("start count down!");
    if(email == ''){
        console.log("send email what: " + email);
        alert('Please enter an email address');
        return;
    }
    setIsCounting(true);
    sendEmailRequest();
  };

  const sendEmailRequest = () => {
    fetch('http://localhost:3001/api/auth/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.log('Failed to send email');
        }
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div>
      {count > 0 ? (
        <p className={isCounting ? styles.cannotClick : styles.canClick} onClick={handleClick}>{isCounting ? count : 'Code'}</p>
      ) : (
        <p className={styles.canClick} onClick={handleClick}>Code</p>
      )}
    </div>
  );
}

export default CountdownTimer;

/*
function CountdownTimer(props) {
  const {email} = props;
  const [count, setCount] = useState(60);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer;

    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCounting, count]);

  const handleClick = (e) => {
    setIsCounting(true);
    if(email == ''){
        console.log("send email what: " + email);
        alert('Please enter an email address');
        return;
    }
    console.log("start count down!");
    //sendEmailRequest();
  };

  

//   return (
//     <div>
//       {count > 0 ? (
//         <p className={isCounting ? styles.cannotClick : styles.canClick} onClick={handleClick}>
//           {isCounting ? count : 'Code'}
//         </p>
//       ) : (
//         <p className={styles.canClick} onClick={handleClick}>
//           {isCounting ? 'Code' : 'Resend Code'}
//         </p>
//       )}
//     </div>
//   );

  return (
    <div>
      {count > 0 ? (
        <p className={isCounting ? styles.cannotClick : styles.canClick} onClick={handleClick}>{isCounting ? count : 'Code'}</p>
      ) : (
        <p className={styles.canClick} onClick={handleClick}>Code</p>
      )}
    </div>
  );
}

export default CountdownTimer;
*/