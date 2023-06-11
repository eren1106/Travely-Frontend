import React from 'react'
import styles from '../styles/notFound.css';

const NotFound = () => {
  return (
    <div className="slider-area"> 
        <div className="slider-content">
            <div className="row">
                <div className="col-md-6 mx-auto text-center">
                    <img className="img-fluid" src="assets/404.png" alt="" />
                    <br />
                    <br />
                    <h2 className="h2">Oops! </h2>
                    <p>We're sorry, <br />
                        The page you were looking for doesn't exist anymore.
                    </p>
                    <a className="btn shuvo-btn" href="#"> Back to Home</a>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default NotFound