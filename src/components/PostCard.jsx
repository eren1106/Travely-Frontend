import React, {useState, useEffect} from "react";
import styles from "../styles/postcard.module.css"
import UserProfile from "./PostUserProfile";
import PostText from "./PostText"
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { useNavigate } from "react-router-dom";
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
        starIcon = <i><StarIcon className={styles.yellowStar} /></i>;
      } else if (i === filledStars + 1 && hasHalfStar) {
        starIcon = <i><StarHalfIcon className={styles.yellowStar} /></i>;
      } else {
        starIcon = <i><StarIcon /></i>;
      }
  
      stars.push(<span key={`star${i}`}>{starIcon}</span>);
    }
  
    return stars;
  };
 
  //navigate to post page
  const handleClick = () =>{
    navigate(`/post/${props.postID}`);
  }
  return (    
    <div className={styles.singleUserPostContainer}>
      <UserProfile profile={props.profile} username={props.username} location={props.location} datetime={props.date} />
      <PostText description={props.description}/>
      <div className={styles.imageContainer}>
          <img className={styles.postImg}src={props.postimg}/>
      </div>
      <hr className={styles.lineBreak} />
      <div className={styles.userRating}>
        <div className={styles.ratingWrapper}>
          <p className={styles.displayRating}>{props.rating}</p>
          <div className={styles.ratingStars}>
            {renderStars(props.rating)}
        </div>
      </div>
      <div className={styles.navContainer}>
        <a className={styles.iconList} onClick={handleClick}>
          <li>Read full Article<i><ArrowForwardOutlinedIcon/></i></li>
        </a>
      </div>
      </div>
  
    </div>
  );
};

export default PostCard;
