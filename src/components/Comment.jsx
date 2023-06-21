import React from 'react'
import styles from '../styles/comment.module.css'
import { checkProfileExists } from '../utils'

const Comment = ({imgUrl, name, text}) => {
  // address to fecth images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={styles.commentWrapper}>
      <img className={styles.commentPic} src={PUBLIC_FOLDER + checkProfileExists(imgUrl)} alt="profile pic" />
      <div className={styles.comment}>
        <h2 className={styles.commentUserName}>{name}</h2>
        <p className={styles.commentText}>{text}</p>
      </div>
    </div>
  )
}

export default Comment