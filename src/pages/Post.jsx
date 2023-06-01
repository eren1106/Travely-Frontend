import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/post.module.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import Comment from '../components/Comment';

const Post = () => {
  const [showOption, setShowOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postData, setPostData] = useState({
    description: "Japan is a fascinating destination that seamlessly blends old-world charm with modern innovation. From the bustling streets of Tokyo to the peaceful temples of Kyoto, there's something for every traveler in this incredible country. Indulge in delicious cuisine, witness breathtaking natural beauty, and immerse yourself in the unique culture and traditions of Japan.",
    location: "Japan, Tokyo",
    images: [
      `${process.env.PUBLIC_URL}/assets/japanView.jpeg`,
      `${process.env.PUBLIC_URL}/assets/balloonView.jpg`,
      `${process.env.PUBLIC_URL}/assets/usaView.jpg`
    ],
  });
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [locationEdit, setLocationEdit] = useState("");

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const commentRef = useRef(null);
  const [comments, setComments] = useState([ // mock data
    {
      username: 'Saitama',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      imgSrc: 'assets/post.png'
    },
    {
      username: 'Reiner',
      text: 'cibxilxnjixopxkifxckmxchxohxigxnninixngdixlxiloumxi',
      imgSrc: 'assets/reiner.jpeg'
    },
    {
      username: 'Bertholdt',
      text: 'Awesome place! ',
      imgSrc: 'assets/bertholdt.jpeg'
    },
  ]);

  const starIcons = Array(5).fill(null);

  const toggleShowOption = () => {
    setShowOption(!showOption);
  };

  const handleShowEdit = () => {
    setDescriptionEdit(postData.description);
    setLocationEdit(postData.location);
    setShowOption(false);
    setIsEdit(true);
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
    setDescriptionEdit(postData.description)
  };

  const showDelete = () => {
    setShowOption(false);
    setShowDeleteAlert(true);
  };

  const closeDelete = () => {
    setShowDeleteAlert(false);
  };

  const handleSaveEdit = () => {
    if(descriptionEdit === "" || locationEdit === "") {
      alert("Description and location cannot be empty");
      return;
    }

    setPostData({
      ...postData,
      description: descriptionEdit,
      location: locationEdit,
    });
    setIsEdit(false);
  };

  const plusSlides = (n) => {
    let index = currentImageIndex + n;
    const len = postData.images.length
    if (index > len - 1) index = 0;
    else if (index < 0) index = len - 1;
    setCurrentImageIndex(index);
  };

  const selectSlide = (n) => {
    setCurrentImageIndex(n);
  };

  const deletePost = () => {
    setShowDeleteAlert(false);
    alert("Post deleted");
  };

  const handleDescriptionChange = (e) => {
    setDescriptionEdit(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocationEdit(e.target.value);
  }

  const handleClickStar = (n) => {
    setRating(n);
  }

  const handleRemoveRating = () => {
    setRating(0);
  }

  const handleSubmitComment = () => {
    setComments([
      ...comments,
      {
        username: 'Eren',
        text: commentRef.current.value,
        imgSrc: 'assets/eren.jpg'
      }
    ]);

    commentRef.current.value = "";
  }

  return (
    <main className={styles.postWrapper}>
      <button className={`${styles.purpleBtn} ${styles.backBtn}`}>
        Back
      </button>
      <div className={styles.postPanel}>
        <button className={`${styles.optionBtn} ${styles.iconWrapper}`} onClick={toggleShowOption}>
          <MoreHorizIcon />
        </button>
        {showOption && <ul className={`${styles.optionsList}`}>
          <li className={styles.option} onClick={handleShowEdit}>Edit post</li>
          <li className={styles.option} onClick={showDelete}>Delete post</li>
        </ul>}
        <section className={styles.topSection}>
          <img className={styles.profilePic} src={`${process.env.PUBLIC_URL}/assets/eren.jpg`} alt="profile pic" />
          <div className={styles.topInfo}>
            <h2 className={styles.userName}>Eren</h2>
            <p className={styles.postDate}>April 9 2023, 13:40 pm</p>
          </div>
        </section>
        <section className={styles.contentSection}>
          {isEdit ?
            <textarea
              value={descriptionEdit}
              className={styles.captionInput}
              type="text"
              placeholder="Write caption..."
              rows="5"
              onChange={handleDescriptionChange}
            />
            : <p className={styles.caption}>{postData.description}</p>
          }
          <div className={styles.locationTag}>
            <PlaceIcon fontSize='small' />
            {
              isEdit ? <input
                value={postData.location}
                className={styles.locationInput}
                type="text"
                onChange={handleLocationChange}
              />
                : <p className={styles.locationText}>{postData.location}</p>
            }
          </div>
          {isEdit && <div className={styles.editBar}>
            <button className={`${styles.saveBtn} ${styles.editBtn} ${styles.purpleBtn}`} onClick={handleSaveEdit}>Save</button>
            <button className={`${styles.cancelBtn} ${styles.editBtn} ${styles.blueBtn}`} onClick={handleCloseEdit}>Cancel</button>
          </div>}
          <div className={styles.slideshowContainer}>
            {
              postData.images.map((image, index) =>
                <div className={`${currentImageIndex !== index && styles.hideSlide} ${styles.fade}`} key={index}>
                  <div className={styles.numbertext}>{`${index + 1}/${postData.images.length}`}</div>
                  <img className={styles.slideImg} src={image} alt="post" />
                </div>
              )
            }
            <div className={styles.prev} onClick={() => plusSlides(-1)}>❮</div>
            <div className={styles.next} onClick={() => plusSlides(1)}>❯</div>
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            {
              postData.images.map((_, i) =>
                <span className={`${styles.dot} ${currentImageIndex === i && styles.active}`} onClick={() => selectSlide(i)}></span>
              )
            }
          </div>
          <div className={`${styles.ratingAndComments}`}>
            <p className={`${styles.ratingText} ${styles.dataText}`}>4.5 average rating</p>
            <p className={`${styles.commentsText} ${styles.dataText}`}>{`${comments.length} comments`}</p>
            <p className={`${styles.viewsText} ${styles.dataText}`}>789 views</p>
          </div>
        </section>
        <hr />
        <section className={`${styles.bottomSection}`}>
          <div className={`${styles.ratingWrapper}`}>
            <p>Give a rating:</p>
            <div className={`${styles.ratingStars}`}>
              {
                starIcons.map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`${styles.ratingStar} ${i < rating && styles.selected}`}
                    onClick={() => handleClickStar(i + 1)}
                  />
                ))
              }
            </div>
            {rating > 0 && <button className={`${styles.clearBtn} ${styles.purpleBtn}`} onClick={() => handleRemoveRating()} >Clear Rating</button>}
          </div>
          <div className={`${styles.commentList}`}>
            {
              comments.map((comment) => (
                <Comment
                  imgUrl={comment.imgSrc}
                  name={comment.username}
                  text={comment.text}
                />
              ))
            }
          </div>
          <div className={styles.currentUserCommentBar}>
            <img className={styles.commentPic} src={`${process.env.PUBLIC_URL}/assets/eren.jpg`} alt="profile pic" />
            <input ref={commentRef} className={styles.commentInput} type="text" placeholder="Write a comment..." />
            <button onClick={handleSubmitComment} className={`${styles.sendBtn} ${styles.iconWrapper} ${styles.blueBtn}`}>
              <SendIcon />
            </button>
          </div>
        </section>
        {
          showDeleteAlert && <div className={`${styles.confirmModal} ${styles.popUpModal}`}>
            <div className={`${styles.modalContent}`}>
              <p className={`${styles.modalText}`}>Are you sure you want to delete this post?</p>
              <div className={`${styles.modalButtons}`}>
                <button className={`${styles.confirmDeleteBtn} ${styles.modalBtn} ${styles.purpleBtn}`} onClick={deletePost}>Yes</button>
                <button className={`${styles.cancelDeleteBtn} cancelDeleteBtn ${styles.modalBtn} ${styles.blueBtn}`} onClick={closeDelete}>No</button>
              </div>
            </div>
          </div>
        }
      </div>
    </main>
  );
};

export default Post;
