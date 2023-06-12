import React from 'react'
import styles from '../styles/userprofile.module.css'
import profile from '../assets/reiner.jpeg'
const UserProfile = (props) => {
  return (
    <div className={styles.profileNameContainer}>
        <img src={profile} />
        <div>
            <p>{props.username}</p>
            <p>
              <small>{props.location}</small>
              <small> | </small>
              <small>{props.datetime}</small>              
            </p>
        </div>
    </div>
  )
}

export default UserProfile