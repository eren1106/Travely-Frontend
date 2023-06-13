import React from "react";
import styles from "../styles/userprofile.module.css";
import defaultProfile from "../assets/defaultProfile.jpeg";
const UserProfile = (props) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={styles.profileNameContainer}>
      <img
        src={
          props.coverPicture
            ? PF + props.coverPicture
            : {defaultProfile}
        }
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
