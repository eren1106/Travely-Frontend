import React from 'react'
import styles from '../styles/notFound.module.css';
import { Link } from 'react-router-dom';



const NotFound = props => {
  return (
    <div className={styles.body404}>
    <div className={styles.sliderArea}> 
        <div className={styles.sliderContent}>
            <div className={styles.row}>
                <div className={styles.notFoundContent}>
                    <img className={styles.imgFluid} src="assets/404.png" alt="" />
                    <br />
                    <br />
                    <h2 className={styles.h2}>Oops! </h2>
                    <p>We're sorry, <br />
                        The page you were looking for doesn't exist anymore.
                    </p>
                    <Link to="/" className={styles.shuvoBtn} href="#"> Back to Home</Link>
                </div> 
            </div>
        </div>
    </div>
    </div>
  )
}

export default NotFound