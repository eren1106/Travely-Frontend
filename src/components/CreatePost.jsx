import React from "react";
import { useState } from "react";
import styles from "../styles/createpost.module.css";
import profile from "../assets/profile.jpg";
import PostModal from "../components/PostModal";
const CreatePost = () => {
  const [modal, setModal] = useState(false);

  const handleClickChange = () => {
    setModal(!modal);
  };
  return (
    <>
      <div className={styles.writePostContainer}>
        <div className={styles.profileNameContainer}>
          <img src={profile} />
        </div>
        <div className={styles.placeholderContainer} onClick={handleClickChange}>
          <p className={styles.placeholderText}>What's on your mind?</p>
        </div>
      </div>
      {modal ? <PostModal close={handleClickChange} /> : ""}
    </>
  );
};

export default CreatePost;
