import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/post.module.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlaceIcon from '@mui/icons-material/Place';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import Comment from '../components/Comment';
import axios from 'axios';
import { useNavigate, useParams, Redirect, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import LoadingOverlay from '../components/LoadingOverlay';

const Post = () => {
  const { id } = useParams();
  const [showOption, setShowOption] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [postData, setPostData] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);

      await fetchPostData();
      await fetchUserRating();

      setInitialLoading(false);
    }

    const fetchPostData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}`); // fetch post data
        setPostData(res.data);
        console.log(res.data);
      }
      catch (err) {
        console.log(err);
        navigate('/not-found');
        return null;
      }
    }

    const fetchUserRating = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}/rating/${"testuserID69"}`); // fetch post data
        setRating(res.data.rating);
        console.log(res.data.rating);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [id, navigate]);

  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [locationEdit, setLocationEdit] = useState("");

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const commentRef = useRef(null);
  const [comments, setComments] = useState([ // mock data
    {
      username: 'Saitama',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      imgSrc: `${process.env.PUBLIC_URL}/assets/eren.jpg`
    },
    {
      username: 'Reiner',
      text: 'cibxilxnjixopxkifxckmxchxohxigxnninixngdixlxiloumxi',
      imgSrc: `${process.env.PUBLIC_URL}/assets/reiner.jpeg`
    },
    {
      username: 'Bertholdt',
      text: 'Awesome place! ',
      imgSrc: `${process.env.PUBLIC_URL}/assets/bertholdt.jpeg`
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

  const handleDescriptionChange = (e) => {
    setDescriptionEdit(e.target.value);
  }

  const handleLocationChange = (e) => {
    setLocationEdit(e.target.value);
  }

  const handleClickStar = async (n) => {
    setLoading(true);

    try{
      const res = await axios.put(`http://localhost:3001/api/posts/${id}/rating/${"testuserID69"}`, {
        rating: n,
      });
      console.log(res.data);
      setRating(n);
    }
    catch(err) {
      console.log(err);
    }

    setLoading(false);
  }

  const handleRemoveRating = async () => {
    setLoading(true);

    try{
      const res = await axios.delete(`http://localhost:3001/api/posts/${id}/rating/${"testuserID69"}`);
      console.log(res.data);
      setRating(0);
    }
    catch(err) {
      console.log(err);
    }

    setLoading(false);
  }

  const handleSaveEdit = async () => {
    if (descriptionEdit === "" || locationEdit === "") {
      alert("Description and location cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:3001/api/posts/${id}`, {
        description: descriptionEdit,
        location: locationEdit,
      });
      setPostData(res.data);
      setIsEdit(false);
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleDeletePost = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`http://localhost:3001/api/posts/${id}`);
      console.log(res.data);
      navigate('/');
    }
    catch (err) {
      console.log(err);
    }

    setLoading(false);
    setShowDeleteAlert(false);
    // TODO: show react toast
  };

  const handleSubmitComment = () => {
    setComments([
      ...comments,
      {
        username: 'Eren',
        text: commentRef.current.value,
        imgSrc: `${process.env.PUBLIC_URL}/assets/eren.jpg`
      }
    ]);

    commentRef.current.value = "";
  }

  return (
    <div className={styles.postWrapper}>
      {
        initialLoading ? <CircularProgress /> :
          <div className={styles.mainContent}>
            <button className={`${styles.purpleBtn} ${styles.backBtn}`}>
              Back
            </button>
            <div className={styles.postPanel}>

              {/* TOP SECTION */}
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

                {/* DESCRIPTION AND LOCATION */}
                {isEdit ?
                  <textarea
                    value={descriptionEdit}
                    className={styles.captionInput}
                    type="text"
                    placeholder="Write description..."
                    rows="5"
                    onChange={handleDescriptionChange}
                  />
                  : <p className={styles.caption}>{postData.description}</p>
                }
                <div className={styles.locationTag}>
                  <PlaceIcon fontSize='small' />
                  {
                    isEdit ? <input
                      value={locationEdit}
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

                {/* IMAGE SLIDES */}
                <div className={styles.slideshowContainer}>
                  {
                    postData.images.map((image, index) =>
                      <div className={`${currentImageIndex !== index && styles.hideSlide} ${styles.fade}`} key={index}>
                        <div className={styles.numbertext}>{`${index + 1}/${postData.images.length}`}</div>
                        <img className={styles.slideImg} src={`${process.env.PUBLIC_URL}/assets/${image}`} alt="post" />
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

                {/* POST STATISTIC */}
                <div className={`${styles.ratingAndComments}`}>
                  <p className={`${styles.ratingText} ${styles.dataText}`}>4.5 average rating</p>
                  <p className={`${styles.commentsText} ${styles.dataText}`}>{`${comments.length} comments`}</p>
                  <p className={`${styles.viewsText} ${styles.dataText}`}>789 views</p>
                </div>

              </section>
              <hr />

              <section className={`${styles.bottomSection}`}>
                {/* RATING SECTION */}
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

                {/* COMMENT SECTION */}
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
            </div>
          </div>
      }

      {/* DELETE ALERT POP UP */}
      {
        showDeleteAlert && <div className={`${styles.confirmModal} ${styles.popUpModal}`}>
          <div className={`${styles.modalContent}`}>
            <p className={`${styles.modalText}`}>Are you sure you want to delete this post?</p>
            <div className={`${styles.modalButtons}`}>
              <button className={`${styles.confirmDeleteBtn} ${styles.modalBtn} ${styles.purpleBtn}`} onClick={handleDeletePost}>Yes</button>
              <button className={`${styles.cancelDeleteBtn} cancelDeleteBtn ${styles.modalBtn} ${styles.blueBtn}`} onClick={closeDelete}>No</button>
            </div>
          </div>
        </div>
      }

      {/* LOADING OVERLAY */}
      <LoadingOverlay loading={loading} />
    </div>
  );
};

export default Post;
