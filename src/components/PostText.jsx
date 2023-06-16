import React from 'react'
import styles from '../styles/posttext.module.css'
const PostText = (props) => {
  return (
    <div className={styles.readMoreContainer}>
        <p className={styles.postText}>
            {props.description}
        </p>
    </div>
  )
}

export default PostText