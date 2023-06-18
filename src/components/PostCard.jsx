import React from "react";
import styles from "../styles/postcard.module.css";
import UserProfile from "./PostUserProfile";
import PostText from "./PostText";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const PostCard = (props) => {
  const navigate = useNavigate();

  // render stars
  const renderStars = (rating) => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      let starIcon;

      if (i <= filledStars) {
        starIcon = (
          <i>
            <StarIcon className={styles.yellowStar} />
          </i>
        );
      } else if (i === filledStars + 1 && hasHalfStar) {
        starIcon = (
          <i>
            <StarHalfIcon className={styles.yellowStar} />
          </i>
        );
      } else {
        starIcon = (
          <i>
            <StarIcon />
          </i>
        );
      }

      stars.push(<span key={`star${i}`}>{starIcon}</span>);
    }

    return stars;
  };

  // Register the date of the view created
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const todayDate = `${year}-${month}-${day}`;

  
  //navigate to post page
  const handleClick = async  () => {
    try {
      const res =  await axios.post(`http://localhost:3001/api/posts/${props.postID}/view`, {
         userID: props.userID,
         date : todayDate //"2023-06-13" // can set to todayDate, fixed String to manipulate the date 
      });
      console.log(res.data);
      navigate(`/post/${props.postID}`);
    }
    catch (err) {
      console.log(err);
    }
    
  };


  return (
    <div className={styles.singleUserPostContainer}>
      <UserProfile
        profile={props.profile}
        username={props.username}
        location={props.location}
        datetime={props.date}
        userID = {props.userID}
      />
      <PostText description={props.description} />
      <div className={styles.imageContainer}>
        <img className={styles.postImg} src={props.postimg} alt="post"/>
      </div>
      <hr className={styles.lineBreak} />
      <div className={styles.userRating}>
        <div className={styles.ratingWrapper}>
          <p className={styles.displayRating}>{props.rating}</p>
          <div className={styles.ratingStars}>{renderStars(props.rating)}</div>
        </div>
        <div className={styles.navContainer}>
          <a className={styles.iconList} onClick={handleClick}>
            <li>
              Read full Article
              <i>
                <ArrowForwardOutlinedIcon />
              </i>
            </li>
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default PostCard;
