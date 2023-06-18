import React from "react";
import styles from "../styles/userprofile.module.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserProfile = (props) => {

  const navigate = useNavigate();

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //check user profile exists
  let defaultImg = ""
  if (props.profile.length === 0 ) {
    defaultImg = "defaultProfile.jpeg";
  }else {
    defaultImg = props.profile;
  }

  // Register the date of the view created
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  //navigate to profile page
  const handleProfileClick = async  () => {
    try {
      const res =  await axios.post(`http://localhost:3001/api/posts/${props.userID}/profileView`, {
         date : todayDate  // can set to todayDate, fixed String to manipulate the date 
      });
      console.log(res.data);
      //navigate(`/profile/${props.userID}`);
    }
    catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.profileNameContainer}>
      <img
        src={PF + defaultImg}
      />
      <div>
        <p className={styles.userName} onClick={handleProfileClick}>{props.username}</p>
        <p>
          <small>{props.location}</small>
          <small> | </small>
          <small>{props.datetime}</small>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
