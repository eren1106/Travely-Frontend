import React, { useState, useLayoutEffect, useEffect, useRef} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/profile.css";
import axios from "axios"
import TopBar from "../components/Topbar";
import SideBar from "../components/SideBar";
import PostCard from "../components/PostCard";
import styles from "../styles/home.module.css";
import { CircularProgress } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const {userID} = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('I like travelling.');
  const [profilePic, setProfilePic] = useState('assets/profile.jpg');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IsAccountDeleted, setIsAccountDeleted] = useState(false);
  const [originalUsername, setOriginalUsername] = useState('');
  const [originalBio, setOriginalBio] = useState('');
  
  
  const [profile, setProfile] = useState("");
  

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // Create refs for DOM elements
  const divUsernameRef = useRef(null);
  const divBioRef = useRef(null);
  const inputUsernameRef = useRef(null);
  const inputBioRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userDataResponse, userPostsResponse] = await Promise.all([
          axios.get(`http://localhost:3001/api/users/${userID}`),
          axios.get(`http://localhost:3001/api/users/${userID}/posts`),
        ]);

        setUser(userDataResponse.data);
        setPosts(userPostsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

      /*
      setIsLoading(true);

      await getPosts();
      await getUser();

      setIsLoading(false);
    };
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/posts/${userID}");
        const userPosts = response.data;
        //console.log(posts);
        setPosts(userPosts);
      } catch (error) {
        console.error(error);
      }
    };
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/${userID}`);
        setUser(res.data);
        setUsername(res.data.username);
        setProfilePic(checkProfileExists(res.data.profilePicture));
      } catch (error) {
        console.log(error);
      }
    };
    */
    fetchUserData();
  }, [userID]);

  const checkProfileExists = (profile) => {
    let defaultImg = "";
    if (profile.length === 0) {
      defaultImg = "defaultProfile.jpeg";
    } else {
      defaultImg = profile;
    }
    return defaultImg;
  };
      /*
      setIsLoading(true);

      await getPosts();
      await getUser();

      setIsLoading(false);
      
    };
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/posts");
        const posts = response.data;
        //console.log(posts);
        setPosts(
          // sort according to date
          posts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    const getUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/users/${userID}`);
        setUser(res.data);
        setProfile(checkProfileExists(res.data.profilePicture));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    
  }, [userID]);
  */
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  
  const handleChangeProfilePic = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setProfilePic(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveProfile = async() => {
    // Handle saving the profile changes
    // Update the state with new username and bio values
    var usernamenew = inputUsernameRef.current.value;
    var bionew = inputBioRef.current.value;

    var divusername = divUsernameRef.current;
    var divBio = divBioRef.current;

    if (usernamenew.trim() === "") {
      usernamenew = divusername.innerHTML;
    }

    if (bionew.trim() === "") {
      bionew = divBio.innerHTML;
    }

    divusername.innerHTML = usernamenew;
    divBio.innerHTML = bionew;

    setIsEditModalOpen(false);

    try {
      await axios.put(`http://localhost:3001/api/users/${userID}`, {
        username: usernamenew,
        bio: bionew,
      });
      console.log('Username and bio updated successfully in the database.');
    } catch (error) {
      console.error('Error updating username and bio in the database', error);
    }
  };

  const handleDeleteAccount = async() => {
    if (window.confirm('Do you confirm to delete account?')) {
      // Handle account deletion
      // Redirect to the appropriate route/page
      try {
        const response = await axios.delete(`/api/users/${userID}`);
        if (response.status === 200) {
          setIsAccountDeleted(true);
          // Redirect to home page or any other desired page
          navigate("/login");
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error deleting account', error);
      }
    }
  };

  
  useLayoutEffect(() => {
    displayCurrentUserInfo();
  }, [divUsernameRef, divBioRef]);
  
  
  const displayCurrentUserInfo = () => {
      const divusername = divUsernameRef.current;
      const divBio = divBioRef.current;

      if (divusername && divBio) {
        const usernamenew = divusername.innerHTML;
        const bionew = divBio.innerHTML;

        if (inputUsernameRef.current && inputBioRef.current) {
          const inputUsername = inputUsernameRef.current;
          const inputBio = inputBioRef.current;

          inputUsername.value = usernamenew;
          inputBio.value = bionew;

          inputUsername.addEventListener('mouseover', () => {
            if (inputUsername.value === usernamenew) {
              inputUsername.value = '';
            }
          });
      
          inputBio.addEventListener('mouseover', () => {
            if (inputBio.value === bionew) {
              inputBio.value = '';
            }
          });
      
          inputUsername.addEventListener('mouseout', () => {
            if (inputUsername.value === '') {
              inputUsername.value = usernamenew;
            }
          });
      
          inputBio.addEventListener('mouseout', () => {
            if (inputBio.value === '') {
              inputBio.value = bionew;
            }
          });
      
          inputUsername.addEventListener('click', () => {
            inputUsername.value = '';
          });
      
          inputBio.addEventListener('click', () => {
            inputBio.value = '';
          });
        }
      }

  };

  

  if (IsAccountDeleted) {
    // Render a message or redirect to a different page after account deletion
    return <div>Account successfully deleted!</div>;
  }

  

  return (
  
      <div id="wrapper">
        <SideBar loading={isLoading} username={user&&user.username} profile = {PUBLIC_FOLDER + profile} email={user&&user.email}/>
        <TopBar />
        <div className="photo_container">
          <div className="photo" id="pic" style={{ textAlign: 'center' }}>
            <img src={profilePic} alt="Profile" />
            <div className="overlay">
              <button className="change-btn">Change Picture</button>
              <input type="file" id="profile-pic" accept="image/*" onChange={handleChangeProfilePic}/>
            </div>
          </div>
        </div>

        <div className="content_container">
          <div className="info_container">
            <div className="personal_container">
              <div className="details_title">Personal Details</div>
              <div className="actions_container">
                <button type="button" id="delete_btn" onClick={handleDeleteAccount}>
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
                        <input type="text" id="username" name="username" defaultValue={username} required ref={inputUsernameRef}/>
                        <br /> 
                        <br />

                        <label htmlFor="bio">Bio</label>
                        <textarea id="bio" name="bio" defaultValue={bio} rows="4" cols="50" required ref={inputBioRef}></textarea>
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

            <div class="details_container">
              <div class="row">
                <div class="column_1">

                  <p>Username </p><br/>
                  <p>Email</p><br/>
                  <p>Gender</p><br/>
                  <p>Date of Birth</p><br/>
                  <p>Date Joined</p><br/><br/>

                </div>

                <div class="column_2">

                  <div id="namearea" ref={divUsernameRef}>Zheng Wu Bang</div><br/>

                  <div id="emailarea">wbzheng@gmail.com</div><br/>

                  <div id="genderarea">Male</div><br/>

                  <div id="DOBarea">12/5/2000</div><br/>

                  <div id="DJoinedarea">4/7/2019</div><br/>

                </div>
              </div>
            </div>

            <hr/>

            <div class="bio_container">
              <p id="bio_details" ref={divBioRef}>I like travelling.</p>
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

      

  );
      
};

export default Profile;

