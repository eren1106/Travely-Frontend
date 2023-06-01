import React, { useState } from 'react';
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
  })
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleShowOption = () => {
    setShowOption(!showOption);
  };

  const showEdit = () => {
    setShowOption(false);
    setIsEdit(true);
  };

  const closeEdit = () => {
    setIsEdit(false);
  };

  const showDelete = () => {
    setShowOption(false);
    setShowDeleteAlert(true);
  };

  const closeDelete = () => {
    setShowDeleteAlert(false);
  };

  const saveEdit = () => {
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
    setPostData({
      ...postData,
      description: e.target.value,
    });
  }

  const handleLocationChange = (e) => {
    setPostData({
      ...postData,
      location: e.target.value,
    });
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
          <li className={styles.option} onClick={showEdit}>Edit post</li>
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
              value={postData.description}
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
            <button className={`${styles.saveBtn} ${styles.editBtn} ${styles.purpleBtn}`} onClick={saveEdit}>Save</button>
            <button className={`${styles.cancelBtn} ${styles.editBtn} ${styles.blueBtn}`} onClick={closeEdit}>Cancel</button>
          </div>}
          <div className={styles.slideshowContainer}>
            {
              postData.images.map((image, index) =>
                <div className={`${currentImageIndex !== index && styles.hideSlide} ${styles.fade}`}>
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
              postData.images.map((image, index) =>
                <span className={styles.dot} onClick={() => selectSlide(index)}></span>
              )
            }
          </div>
          <div className={`${styles.ratingAndComments}`}>
            <p className={`${styles.ratingText} ${styles.dataText}`}>4.5 average rating</p>
            <p className={`${styles.commentsText} ${styles.dataText}`}>123 comments</p>
            <p className={`${styles.viewsText} ${styles.dataText}`}>789 views</p>
          </div>
        </section>
        <hr />
        <section className={`${styles.bottomSection}`}>
          <div className={`${styles.ratingWrapper}`}>
            <p>Give a rating:</p>
            <div className={`${styles.ratingStars}`}>
              <StarIcon className={styles.ratingStar} />
              <StarIcon className={styles.ratingStar} />
              <StarIcon className={styles.ratingStar} />
              <StarIcon className={styles.ratingStar} />
              <StarIcon className={styles.ratingStar} />
            </div>
            <button className={`${styles.clearBtn} ${styles.purpleBtn}`}>Clear Rating</button>
          </div>
          <div className={`${styles.commentList}`}>
            <Comment
              imgUrl={`${process.env.PUBLIC_URL}/assets/reiner.jpeg`}
              name="Reiner"
              text="hello world hello world hello world hello world"
            />
            <Comment
              imgUrl={`${process.env.PUBLIC_URL}/assets/reiner.jpeg`}
              name="Reiner"
              text="hello world hello world hello world hello world"
            />
            <Comment
              imgUrl={`${process.env.PUBLIC_URL}/assets/reiner.jpeg`}
              name="Reiner"
              text="hello world hello world hello world hello world"
            />
          </div>
          <div className={`${styles.currentUserCommentBar}`}>
            <img className={`${styles.commentPic}`} src={`${process.env.PUBLIC_URL}/assets/eren.jpg`} alt="profile pic" />
            <input className={`${styles.commentInput}`} type="text" placeholder="Write a comment..." />
            <button className={`${styles.sendBtn} ${styles.iconWrapper} ${styles.blueBtn}`}>
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
