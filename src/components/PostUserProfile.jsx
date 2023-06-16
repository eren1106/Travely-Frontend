import React from "react";
import styles from "../styles/userprofile.module.css";

const UserProfile = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //check user profile exists
  let defaultImg = ""
  if (props.profile.length === 0 ) {
    defaultImg = "defaultProfile.jpeg";
  }else {
    defaultImg = props.profile;
  }
  return (
    <div className={styles.profileNameContainer}>
      <img
        src={PF + defaultImg}
      />
      <div>
        <p>{props.username}</p>
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
