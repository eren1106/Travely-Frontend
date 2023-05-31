import React from 'react';
import styles from '../styles/post.module.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import Comment from '../components/Comment';

const Post = () => {
  const toggleShowOption = () => {
    // Add your toggleShowOption logic here
  };

  const showEdit = () => {
    // Add your showEdit logic here
  };

  const showDelete = () => {
    // Add your showDelete logic here
  };

  const saveEdit = () => {
    // Add your saveEdit logic here
  };

  const closeEdit = () => {
    // Add your closeEdit logic here
  };

  const plusSlides = (n) => {
    // Add your plusSlides logic here
  };

  const currentSlide = (n) => {
    // Add your currentSlide logic here
  };

  const deletePost = () => {
    // Add your deletePost logic here
  };

  const closeDelete = () => {
    // Add your closeDelete logic here
  };

  return (
    <main className={styles.postWrapper}>
      <button className={`${styles.purpleBtn} ${styles.backBtn}`}>
        Back
      </button>
      <div className={`${styles.postPanel}`}>
        <button className={`${styles.optionBtn} ${styles.iconWrapper}`} onClick={toggleShowOption}>
          <MoreHorizIcon />
        </button>
        <ul className={`${styles.optionsList}`}>
          <li className={`${styles.option}`} onClick={showEdit}>Edit post</li>
          <li className={`${styles.option}`} onClick={showDelete}>Delete post</li>
        </ul>
        <section className={`${styles.topSection}`}>
          <img className={`${styles.profilePic}`} src={`${process.env.PUBLIC_URL}/assets/eren.jpg`} alt="profile pic" />
          <div className={`${styles.topInfo}`}>
            <h2 className={`${styles.userName}`}>Eren</h2>
            <p className={`${styles.postDate}`}>April 9 2023, 13:40 pm</p>
          </div>
        </section>
        <section className={`${styles.contentSection}`}>
          <p className={`${styles.caption}`}>Japan is a fascinating destination that seamlessly blends old-world charm with modern innovation. From the bustling streets of Tokyo to the peaceful temples of Kyoto, there's something for every traveler in this incredible country. Indulge in delicious cuisine, witness breathtaking natural beauty, and immerse yourself in the unique culture and traditions of Japan.</p>
          <textarea className={`${styles.captionInput}`} type="text" placeholder="Write caption..." rows="5"></textarea>
          <div className={`${styles.locationTag}`}>
            <PlaceIcon fontSize='small'/>
            <p className={`${styles.locationText}`}>Tokyo, Japan</p>
            <input className={`${styles.locationInput}`} type="text" />
          </div>
          <div className={`${styles.editBar}`}>
            <button className={`${styles.saveBtn} ${styles.editBtn} ${styles.purpleBtn}`} onClick={saveEdit}>Save</button>
            <button className={`${styles.cancelBtn} ${styles.editBtn} ${styles.blueBtn}`} onClick={closeEdit}>Cancel</button>
          </div>
          <div className={`${styles.slideshowContainer}`}>
            <div className={`${styles.fade}`}>
              <div className={styles.numbertext}>1 / 3</div>
              <img className={styles.slideImg} src="assets/japanView.jpeg" alt="Slide 1" />
            </div>
            <div className={`${styles.hideSlide} ${styles.fade}`}>
              <div className={styles.numbertext}>2 / 3</div>
              <img className={styles.slideImg} src="assets/balloonView.jpg" alt="Slide 2" />
            </div>
            <div className={`${styles.hideSlide} ${styles.fade}`}>
              <div className={styles.numbertext}>3 / 3</div>
              <img className={styles.slideImg} src="assets/usaView.jpg" alt="Slide 3" />
            </div>
            <a className={styles.prev} onClick={() => plusSlides(-1)}>❮</a>
            <a className={styles.next} onClick={() => plusSlides(1)}>❯</a>
          </div>
          <br />
          <div style={{ textAlign: 'center' }}>
            <span className={styles.dot} onClick={() => currentSlide(1)}></span>
            <span className={styles.dot} onClick={() => currentSlide(2)}></span>
            <span className={styles.dot} onClick={() => currentSlide(3)}></span>
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
              <StarIcon className={styles.ratingStar}/>
              <StarIcon className={styles.ratingStar}/>
              <StarIcon className={styles.ratingStar}/>
              <StarIcon className={styles.ratingStar}/>
              <StarIcon className={styles.ratingStar}/>
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
        <div className={`${styles.confirmModal} ${styles.popUpModal}`}>
          <div className={`${styles.modalContent}`}>
            <p className={`${styles.modalText}`}>Are you sure you want to delete this post?</p>
            <div className={`${styles.modalButtons}`}>
              <button className={`${styles.confirmDeleteBtn} ${styles.modalBtn} ${styles.purpleBtn}`} onClick={deletePost}>Yes</button>
              <button className={`${styles.cancelDeleteBtn} cancelDeleteBtn ${styles.modalBtn} ${styles.blueBtn}`} onClick={closeDelete}>No</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Post;
