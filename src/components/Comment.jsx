import React from 'react'
import styles from '../styles/comment.module.css'

const Comment = ({imgUrl, name, text}) => {
  return (
    <div className={styles.commentWrapper}>
      <img className={styles.commentPic} src={imgUrl} alt="profile pic" />
      <div className={styles.comment}>
        <h2 className={styles.commentUserName}>{name}</h2>
        <p className={styles.commentText}>{text}</p>
      </div>
    </div>
  )
}

export default Comment