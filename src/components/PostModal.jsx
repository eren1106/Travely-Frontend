import React, { useState } from "react";
import styles from "../styles/createpostmodal.module.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import img from "../assets/profile.jpg";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import axios from 'axios'

const PostModal = (props) => {
  

  //mock user id
  const userID = "6481966c3137e182902f753d";
  //handle form submit
  // (able to upload single file with unique name)
  // const handleSubmit = async(e) =>{
  //   e.preventDefault();  
  //   const newPost = {
  //     userID : userID, //TODO : set userID dynamically
  //     description : textareaValue,
  //     location : selectedOption,
  //   }
  //   if (fileArray.length !== 0) {
  //     const data = new FormData();
  //     const filenames = []; // Create an empty array to store filenames

  //     fileArray.forEach(async (currentFile) => {
        
  //       const fileName = Date.now() + currentFile.name;
  //       data.append("name", fileName);
  //       data.append("file", currentFile);
  //       filenames.push(fileName); // Push the filename into the array
  //     });
  //     newPost.images = filenames;
  //     try {
  //       console.log(data);
  //       await axios.post("http://localhost:3001/api/upload", data);
  //     } catch (err) {}
  //   }
  //   try {
  //     await axios.post("http://localhost:3001/api/posts", newPost);
  //     window.location.reload();
  //   } catch (err) {}
  // }


  // handle multiple sub
  const handleSubmit = async(e) =>{
    e.preventDefault();  
    const newPost = {
      userID : userID, //TODO : set userID dynamically
      description : textareaValue,
      location : selectedOption,
    }
    if (fileArray.length !== 0) {
     
      const filenames = []; // Create an empty array to store filenames

      fileArray.forEach(async (currentFile) => {
        let data = new FormData();
        const fileName = Date.now() + currentFile.name;
        data.append("name", fileName);
        data.append("file", currentFile);
        filenames.push(fileName); // Push the filename into the array
        try {
          console.log(data);
          await axios.post("http://localhost:3001/api/upload", data);
        } catch (err) {}
      });
      newPost.images = filenames;
      
    }
    try {
      await axios.post("http://localhost:3001/api/posts", newPost);
      window.location.reload();
    } catch (err) {}
  }
  // dropdown menu
  const [isOptionMenuActive, setOptionMenuActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Country");

  const toggleOptionMenu = () => {
    setOptionMenuActive(!isOptionMenuActive);
  };

  const handleOptionSelection = (optionText) => {
    setSelectedOption(optionText);
    setOptionMenuActive(false);
  };



  //text area
  const [textareaValue, setTextareaValue] = useState("");
  const handleTextareaChange = (event) => {
      setTextareaValue(event.target.value);
      console.log(event.target.value)
  };
  
  const handleTextareaFocus = () => {
    setTextareaValue("");
  };


  // upload, display, delete image
  const [fileArray, setFileArray] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFileArray = [...fileArray];
    for (let i = 0; i < files.length; i++) {
      newFileArray.push(files[i]);
    }
    setFileArray(newFileArray);
    displayFile(newFileArray);
  };

  const deleteMedia = (index) => {
    const newFileArray = [...fileArray];
    newFileArray.splice(index, 1);
    setFileArray(newFileArray);
    displayFile(newFileArray);
  };

  const displayFile = (files) => {
    return files.map((media, index) => {
      if (media.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(media);
        return (
          <div className={styles.image} key={index}>
            <img src={imageURL} alt="image" />
            <span onClick={() => deleteMedia(index)}>&times;</span>
          </div>
        );
      }
      return null;
    });
  };

  //close modal
  const handleClick = () => {
    props.close();
  };

  return (
    <div className={`${styles.active} ${styles.wrapper}`}>
      <div className={`${styles.popupOuter}`}>
        <div className={`${styles.popUpBox}`}>
          <i id="close" className={styles.close} onClick={handleClick}>
            <CloseOutlinedIcon />
          </i>
          <div className={`${styles.profileText}`}>
            <img className={`${styles.profileImg}`} src={img} alt="" />
            <div className={`${styles.text}`}>
              <span className={`${styles.name}`}>Zheng Wu Bang</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className={`${styles.selectMenu} ${ isOptionMenuActive ? styles.active : ""}`}>
              <div className={styles.selectBtn} onClick={toggleOptionMenu}>
                <span className={styles.sBtnText}>{selectedOption}</span>
                <i>
                  <KeyboardArrowDownOutlinedIcon />
                </i>
              </div>
              <ul className={`${styles.options} `}>
                <li className={styles.option} onClick={() => handleOptionSelection("Malaysia")}>
                  <i style={{ color: "#171515" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Malaysia</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("Australia")}>
                  <i style={{ color: "#E1306C" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Australia</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("France")}>
                  <i style={{ color: "#0E76A8" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>France</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("China")}>
                  <i style={{ color: "#4267B2" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>China</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("Vietnam")}>
                  <i style={{ color: "#1DA1F2" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Vietnam</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("Egypt")}>
                  <i style={{ color: "#2F4F4F" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Egypt</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("India")}>
                  <i style={{ color: "#00FF7F" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>India</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("Italy")}>
                  <i style={{ color: "#DC143C" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Italy</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("Japan")}>
                  <i style={{ color: "#FFC0CB" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Japan</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("Switzerland")}>
                  <i style={{ color: "#FFA500" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Switzerland</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("Taiwan")}>
                  <i style={{ color: "#00FFFF" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>Taiwan</span>
                </li>
                <li className={styles.option} onClick={() => handleOptionSelection("USA")}>
                  <i style={{ color: "#800080" }}>
                    <OutlinedFlagTwoToneIcon />
                  </i>
                  <span className={styles.optionText}>USA</span>
                </li>
              </ul>
            </div>
            <textarea
              spellCheck={false}
              placeholder="What's on your mind ?"
              value={textareaValue}
              onChange={handleTextareaChange}
              onFocus={handleTextareaFocus}
            ></textarea>
            <div className={styles.uploadContainer}>
              <output>{displayFile(fileArray)}</output>
              <label className={styles.fileLabel}>
                Upload
                <input
                  className={styles.fileInput}
                  type="file"
                  name="file"
                  accept="image/jpeg, image/png, image/jpg"
                  onChange={handleFileChange}
                  multiple
                />
              </label>
            </div>
            <div className={styles.button}>
              <button className={styles.send} type="submit">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
