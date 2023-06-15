import React, { useState, useLayoutEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Zheng Wu Bang');
  const [bio, setBio] = useState('I like travelling.');
  const [profilePic, setProfilePic] = useState('assets/profile.jpg');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [IsAccountDeleted, setIsAccountDeleted] = useState(false);

  // Create refs for DOM elements
  const divUsernameRef = useRef(null);
  const divBioRef = useRef(null);
  const inputUsernameRef = useRef(null);
  const inputBioRef = useRef(null);

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

  const handleSaveProfile = () => {
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
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Do you confirm to delete account?')) {
      // Handle account deletion
      // Redirect to the appropriate route/page
      deleteAccount()
        .then(() => {
          setIsAccountDeleted(true);
          navigate.push('/login');
        })

        .catch((error) =>{
          console.error("Error deleting account", error);
        });
    }
  }
  

  const deleteAccount = () =>{
    return new Promise((resolve, reject)=> {
      setTimeout(()=>{
        resolve();
      },2000);
    });
  };

  useLayoutEffect(() => {
    displayCurrentUserInfo();
  }, []);
  
  const displayCurrentUserInfo = () => {
      const divusername = divUsernameRef.current;
      const divBio = divBioRef.current;

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

  };

  if (IsAccountDeleted) {
    // Render a message or redirect to a different page after account deletion
    return <div>Account successfully deleted!</div>;
  }

  return (
  
      <div id="wrapper">
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
              <button type="button" id="edit_btn" onClick={handleEditProfile}>
                Edit Profile
              </button>

              {/* Edit Profile Modal */}
              {isEditModalOpen && (
                <div id="editModal" className="editmodal_container">
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
                        <input type="text" id="username" name="username" required ref={inputUsernameRef}/>
                        <br />
                        <br />

                        <label htmlFor="bio">Bio</label>
                        <textarea id="bio" name="bio" rows="4" cols="50" required ref={inputBioRef}></textarea>
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

              <div id="namearea" className="details_info" ref={divUsernameRef}>
                {username}
              </div>
              <div className="details_title">Bio</div>
              <div id="bio_details" className="details_info" ref={divBioRef}>
                {bio}
              </div>
            </div>
          </div>

          <div className="actions_container">
            <button type="button" id="delete_btn" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
  
  );
      
};

export default Profile;

