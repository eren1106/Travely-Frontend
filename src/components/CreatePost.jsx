import React from "react";
import { useState } from "react";
import styles from "../styles/createpost.module.css";
import PostModal from "../components/PostModal";
import { CircularProgress } from "@mui/material";

const CreatePost = (props) => {
  const [modal, setModal] = useState(false);

  const handleClickChange = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className={styles.writePostContainer}>
        <div className={styles.profileNameContainer}>
          {props.loading ? <CircularProgress/> : <img src={props.profile} />}
        </div>
        <div className={styles.placeholderContainer} onClick={handleClickChange}>
          <p className={styles.placeholderText}>What's on your mind?</p>
        </div>
      </div>
      {modal ? <PostModal userprofile={props.profile}  username={props.username} close={handleClickChange} /> : ""}
    </>
  );
};

export default CreatePost;
