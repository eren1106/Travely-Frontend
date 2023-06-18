import React, { useState, useLayoutEffect, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/profile.css";
import axios from "axios"
import TopBar from "../components/Topbar";
import SideBar from "../components/SideBar";
import PostCard from "../components/PostCard";
import styles from "../styles/profile.module.css";
import { CircularProgress } from "@mui/material";
import { UserContext } from '../userContext';
import { formatDate } from '../utils';
import LoadingOverlay from '../components/LoadingOverlay';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [overlayLoading, setOverlayLoading] = useState(false);

  const { setUsers } = useContext(UserContext);


  // const [username, setUsername] = useState(user && user.username);
  // const [profile, setProfile] = useState("");
  // const [bio, setBio] = useState('I like travelling.');
  // const [email, setEmail] = useState("");
  // const [gender, setGender] = useState("");
  // const [DOB, setDOB] = useState("");
  // const [dJoined, setDJoined] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
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

    handleCloseModal();
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


  // useLayoutEffect(() => {
  //   displayCurrentUserInfo();
  // }, [divUsernameRef, divBioRef, username]);

  // const displayCurrentUserInfo = () => {
  //     const divusername = divUsernameRef.current;
  //     const divBio = divBioRef.current;

  //     if (divusername && divBio) {
  //       const usernamenew = divusername.innerHTML;
  //       const bionew = divBio.innerHTML;

  //       if (inputUsernameRef.current && inputBioRef.current) {
  //         const inputUsername = inputUsernameRef.current;
  //         const inputBio = inputBioRef.current;

  //         inputUsername.value = usernamenew === user.username ? '' : usernamenew;
  //         inputBio.value = bionew === bio ? '' : bionew;


  //         inputUsername.addEventListener('mouseover', () => {
  //           if (inputUsername.value === usernamenew) {
  //             inputUsername.value = '';
  //           }
  //         });

  //         inputBio.addEventListener('mouseover', () => {
  //           if (inputBio.value === bionew) {
  //             inputBio.value = '';
  //           }
  //         });

  //         inputUsername.addEventListener('mouseout', () => {
  //           if (inputUsername.value === '') {
  //             inputUsername.value = usernamenew;
  //           }
  //         });

  //         inputBio.addEventListener('mouseout', () => {
  //           if (inputBio.value === '') {
  //             inputBio.value = bionew;
  //           }
  //         });

  //         inputUsername.addEventListener('click', () => {
  //           inputUsername.value = '';
  //         });

  //         inputBio.addEventListener('click', () => {
  //           inputBio.value = '';
  //         });
  //       }
  //     }

  // };

  // if (IsAccountDeleted) {
  //   // Render a message or redirect to a different page after account deletion
  //   return <div>Account successfully deleted!</div>;
  // }

  const fileInputRef = useRef(null);
  const handleChangeProfilePic = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.addEventListener('load', () => {
      //   setProfilePic(reader.result);
      // });
      // reader.readAsDataURL(file);
      // setProfilePicFile(file);
      // console.log("FILE", file);

      const userID = localStorage.getItem("currentUserID");
    let profilePic;
    let data = new FormData();
    profilePic = Date.now() + file.name;
    data.append("name", profilePic);
    data.append("file", file);
    try {
      console.log(data);
      const picRes = await axios.post("http://localhost:3001/api/upload", data);
      console.log("PROFILE PIC", picRes);
    } catch (err) {
      console.log(err);
    }
    // if (fileArray.length !== 0) {

    //   const filenames = []; // Create an empty array to store filenames

    //   fileArray.forEach(async (currentFile) => {
    //     let data = new FormData();
    //     const fileName = Date.now() + currentFile.name;
    //     data.append("name", fileName);
    //     data.append("file", currentFile);
    //     filenames.push(fileName); // Push the filename into the array
    //     try {
    //       console.log(data);
    //       await axios.post("http://localhost:3001/api/upload", data);
    //     } catch (err) {}
    //   });
    //   newPost.images = filenames;

    // }
    try {
      const res = await axios.put(`http://localhost:3001/api/users/${userID}`, {
        ...user,
        profilePicture: profilePic,
      });
      console.log("USERRR", res.data);
      setUser(res.data);
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    fileInputRef.current.click();
    // const userID = localStorage.getItem("currentUserID");
    // let profilePic;
    // let data = new FormData();
    // const fileName = Date.now() + profilePicFile.name;
    // data.append("name", fileName);
    // data.append("file", profilePicFile);
    // try {
    //   console.log(data);
    //   profilePic = await axios.post("http://localhost:3001/api/upload", data);
    // } catch (err) {
    //   console.log(err);
    // }
    // // if (fileArray.length !== 0) {

    // //   const filenames = []; // Create an empty array to store filenames

    // //   fileArray.forEach(async (currentFile) => {
    // //     let data = new FormData();
    // //     const fileName = Date.now() + currentFile.name;
    // //     data.append("name", fileName);
    // //     data.append("file", currentFile);
    // //     filenames.push(fileName); // Push the filename into the array
    // //     try {
    // //       console.log(data);
    // //       await axios.post("http://localhost:3001/api/upload", data);
    // //     } catch (err) {}
    // //   });
    // //   newPost.images = filenames;

    // // }
    // try {
    //   const res = await axios.put(`http://localhost:3001/api/users/${userID}`, profilePic);
    //   setUser(res.data);
    //   // window.location.reload();
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (

    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
    }}>
      {
        isLoading ? <CircularProgress /> : <div id="wrapper">
          <SideBar loading={isLoading} username={user && user.username} profile={PUBLIC_FOLDER + checkProfileExists(user.profilePicture)} email={user && user.email} />
          <TopBar />
          <form className="photo_container" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="photo" id="pic" style={{ textAlign: 'center' }}>
              <img src={PUBLIC_FOLDER + user.profilePicture} alt="Profile" />
              <div className="overlay">
                <button type="submit" className="change-btn">Change Picture</button>
                <input ref={fileInputRef} style={{display: 'none'}} className="profileInput" type="file" id="profile-pic" accept="image/*" onChange={handleChangeProfilePic} />
              </div>
            </div>
          </form>

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
                          <label htmlFor="username">Username</label>
                          <input className="profileInput" type="text" id="username" name="username" defaultValue={user.username} required ref={inputUsernameRef} />
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
      <LoadingOverlay loading={overlayLoading}/>
    </div>
  );

};

export default Profile;

