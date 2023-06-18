import React, { useState, useLayoutEffect, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/profile.css";
import axios from "axios"
import TopBar from "../components/Topbar";
import SideBar from "../components/SideBar";
import PostCard from "../components/PostCard";
import styles from "../styles/home.module.css";
import { CircularProgress } from "@mui/material";
import { UserContext } from '../userContext';
import { formatDate } from '../utils';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const { setUsers } = useContext(UserContext);


  // const [username, setUsername] = useState(user && user.username);
  // const [profile, setProfile] = useState("");
  // const [bio, setBio] = useState('I like travelling.');
  // const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("");
  // const [DOB, setDOB] = useState("");
  // const [dJoined, setDJoined] = useState("");
  const [profilePic, setProfilePic] = useState(`${process.env.PUBLIC_URL}/assets/profile.jpg`);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IsAccountDeleted, setIsAccountDeleted] = useState(false);



  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // Create refs for DOM elements
  const divUsernameRef = useRef(null);
  const divBioRef = useRef(null);
  const inputUsernameRef = useRef(null);
  const inputBioRef = useRef(null);

  useEffect(() => {
    let userData;
    const fetchData = async () => {
      setIsLoading(true);
      await getUser();
      await getPosts();
      setIsLoading(false);
    };

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/users/${id}`
        );
        console.log("USER", id);
        userData = res.data;
        setUser(userData);
        console.log("USER DATA", userData);
      } catch (error) {
        console.error(error);
      }
    };

    const getPosts = async () => {
      try {
        console.log("USER", userData);
        const response = await axios.get(
          `http://localhost:3001/api/posts/user/${userData._id}`
        );
        const userPosts = response.data;
        setPosts(userPosts);
        console.log(userPosts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const checkProfileExists = (profile) => {
    console.log(profile);
    let defaultImg = "";
    if (profile.length === 0) {
      defaultImg = "defaultProfile.jpeg";
    } else {
      defaultImg = profile;
    }
    return defaultImg;
  };

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };



  


  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = async () => {
    // // Handle saving the profile changes
    // // Update the state with new username and bio values
    var usernamenew = inputUsernameRef.current.value;
    var bionew = inputBioRef.current.value;

    // var divusername = divUsernameRef.current;
    // var divBio = divBioRef.current;

    // if (usernamenew.trim() === "") {
    //   usernamenew = divusername.innerHTML;
    // }

    // if (bionew.trim() === "") {
    //   bionew = divBio.innerHTML;
    // }

    // divusername.innerHTML = usernamenew;
    // divBio.innerHTML = bionew;

    // setIsEditModalOpen(false);

    try {
      await axios.put(`http://localhost:3001/api/users/${user._id}`, {
        username: usernamenew,
        bio: bionew,
      });

      setUser({
        ...user,
        username: usernamenew,
        bio: bionew,
      })

      inputUsernameRef.current.value = usernamenew;
      inputBioRef.current.value = bionew;

      // update local storage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      storedUser.username = usernamenew;
      storedUser.bio = bionew;
      localStorage.setItem('user', JSON.stringify(storedUser));
      setUsers(storedUser);
      // setUsername(usernamenew);

      console.log('Username and bio updated successfully in the database.');
    } catch (error) {
      console.error('Error updating username and bio in the database', error);
    }


  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Do you confirm to delete account?')) {
      // Handle account deletion
      // Redirect to the appropriate route/page
      try {
        const response = await axios.delete(`http://localhost:3001/api/users/${user._id}`);

          // Redirect to home page or any other desired page
          console.log(response.data);
          navigate("/login");
          localStorage.removeItem('user');
          localStorage.removeItem('currentUserID');

      } catch (error) {
        console.error('Error deleting account', error);
      }
    }
  };



  return (

    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
    }}>
      {
        isLoading ? <CircularProgress /> : <div id="wrapper">
          <SideBar loading={isLoading} username={user && user.username} profile={PUBLIC_FOLDER + checkProfileExists(user.profilePicture)} email={user && user.email} />
          <TopBar />
          <div className="photo_container">
            <div className="photo" id="pic" style={{ textAlign: 'center' }}>
              <img src={PUBLIC_FOLDER + checkProfileExists(user.profilePicture)} alt="Profile" />
              <div className="overlay">
                <button className="change-btn">Change Picture</button>
                <input className="profileInput" type="file" id="profile-pic" accept="image/*" />
              </div>
            </div>
          </div>
          <div className="content_container">
            <div className="info_container">
              <div className="personal_container">
                <div className="details_title">Personal Details</div>
                <div className="actions_container">
                  <button type="submit" id="delete_btn" onClick={handleDeleteAccount}>
                    Delete Account
                  </button>
                </div>

                <button type="button" id="edit_btn" onClick={handleEditProfile}>
                  Edit Profile
                </button>

                {/* Edit Profile Modal */}
                {isEditModalOpen && (
                  <div id="editModal" className="editmodal_container" style={{ display: isEditModalOpen ? 'block' : 'none' }}>
                    <div className="editmodal_content">
                      <form className="editProfile">
                        <span className="close" onClick={handleCloseModal}>
                          &times;
                        </span>

                        <div className="input_container">
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <br />
                          <label htmlFor="username">Username</label>
                          <input className="profileInput" type="text" id="username" name="username" defaultValue="username" required ref={inputUsernameRef} />
                          <br />
                          <br />

                          <label htmlFor="bio">Bio</label>
                          <textarea id="bio" name="bio" defaultValue={user.bio} rows="4" cols="50" required ref={inputBioRef}></textarea>
                          <br />
                          <br />
                        </div>

                        <button type="button" id="done_button" onClick={handleSaveProfile}>
                          Done
                        </button>
                      </form>
                    </div>
                  </div>
                )}


              </div>

              <div className="details_container">
                <div className="row">
                  <div className="column_1">

                    <p>Username </p><br />
                    <p>Email</p><br />
                    {/* <p>Gender</p><br />
                    <p>Date of Birth</p><br /> */}
                    <p>Date Joined</p><br /><br />

                  </div>

                  <div className="column_2">

                    <div id="namearea" ref={divUsernameRef}>{user && user.username}</div><br />
                    <div id="emailarea">{user && user.email}</div><br />
                    {/* <div id="genderarea">{user && user.gender}</div><br />
                    <div id="DOBarea">{user && user.DOB}</div><br /> */}
                    <div id="DJoinedarea">{user && formatDate(user.createdAt)}</div><br />

                  </div>
                </div>
              </div>

              <hr />

              <div className="bio_container">
                <p id="bio_details" ref={divBioRef}>{user.bio}</p>
              </div>
            </div>
          </div>

          <div className={styles.postContainer}>
            {isLoading ? (
              <CircularProgress className={styles.loading} />
            ) : (
              posts.map((post) => (
                <PostCard
                  profile={post.profilePicture}
                  key={post.postID}
                  postID={post.postID}
                  username={post.username}
                  location={post.location}
                  rating={post.rating}
                  description={post.description}
                  postimg={PUBLIC_FOLDER + post.images}
                  date={post.createdAt}
                />
              ))
            )}
          </div>
        </div>
      }
    </div>  
  );

};

export default Profile;

