import React from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import TopBar from "../components/Topbar";
import PostCard from "../components/PostCard";
import { CircularProgress } from "@mui/material";
import styles from "../styles/search.module.css";
import OutlinedFlagTwoToneIcon from "@mui/icons-material/OutlinedFlagTwoTone";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useLocation } from 'react-router-dom';
const Search = () => {

  const location = useLocation();
  const { searchResult , notFound} = location.state;

  //mock user id
  const userID = "6481966c3137e182902f753d";

  const [searchedPost, setSearchedPost] = useState(searchResult);

  // sort post based on rating
  const sortPost = () => {
    if (selectedRating === "Low to High"){
      setSearchedPost(
        searchResult.sort((p1, p2) => {
          return p2.rating - p1.rating;
        })
      )
    }else if (selectedRating === "High to Low"){
      setSearchedPost(
        searchResult.sort((p1, p2) => {
          return p1.rating - p2.rating;
        })
      )
    }
  }
  // address to fecth images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // dropdown menu for country
  const [isOptionMenuActive, setOptionMenuActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Country");
  const toggleOptionMenu = () => {
    setOptionMenuActive(!isOptionMenuActive);
  };
  const handleOptionSelection = (optionText) => {
    setSelectedOption(optionText);
    setOptionMenuActive(false);
    
  };

  //dropdown menu for rating
  const [rating, setRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState("Rating");
  const toggleRatingMenu = () => {
    setRating(!rating);
  };
  const handleRatingSelection = (optionText) => {
    setSelectedRating(optionText);
    setRating(false);
    sortPost();
  };


  const [profile, setProfile] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // address to fetch images
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const checkProfileExists = (profile) => {
    let defaultImg = "";
    if (profile.length === 0) {
      defaultImg = "defaultProfile.jpeg";
    } else {
      defaultImg = profile;
    }
    return defaultImg;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getUser();
      setIsLoading(false);
    };
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/users/${userID}`
        );
        setUser(res.data);
        setProfile(checkProfileExists(res.data.profilePicture));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userID]);

  return (
    <div>
      <SideBar
        loading={isLoading}
        username={user.username}
        profile={PF + profile}
        email={user.email}
      />
      <TopBar />

      <div className={styles.filterContainer}>
        <h2>Search Result :</h2>

        {/* <div className={`${styles.selectMenu} ${isOptionMenuActive ? styles.active : ""}`}>
          <div className={styles.selectBtn} onClick={toggleOptionMenu}>
            <span className={styles.sBtnText}>{selectedOption}</span>
            <i>
              <KeyboardArrowDownOutlinedIcon />
            </i>
          </div>
          <ul className={`${styles.options} `}>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Malaysia")}
            >
              <i style={{ color: "#171515" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Malaysia</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Australia")}
            >
              <i style={{ color: "#E1306C" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Australia</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("France")}
            >
              <i style={{ color: "#0E76A8" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>France</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("China")}
            >
              <i style={{ color: "#4267B2" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>China</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Vietnam")}
            >
              <i style={{ color: "#1DA1F2" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Vietnam</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Egypt")}
            >
              <i style={{ color: "#2F4F4F" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Egypt</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("India")}
            >
              <i style={{ color: "#00FF7F" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>India</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Italy")}
            >
              <i style={{ color: "#DC143C" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Italy</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Japan")}
            >
              <i style={{ color: "#FFC0CB" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Japan</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Switzerland")}
            >
              <i style={{ color: "#FFA500" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Switzerland</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("Taiwan")}
            >
              <i style={{ color: "#00FFFF" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>Taiwan</span>
            </li>
            <li
              className={styles.option}
              onClick={() => handleOptionSelection("USA")}
            >
              <i style={{ color: "#800080" }}>
                <OutlinedFlagTwoToneIcon />
              </i>
              <span className={styles.optionText}>USA</span>
            </li>
          </ul>
        </div> */}


        <div className={`${styles.selectMenuRating} ${rating ? styles.active : ""}`} id="rating">
          <div className={styles.selectBtn} onClick={toggleRatingMenu}>
            <span>{selectedRating}</span>
            <i><KeyboardArrowDownOutlinedIcon /></i>
          </div>
          <ul className={styles.options}>
            <li className={styles.option} onClick={() => handleRatingSelection("High to Low")} >
              <span className={styles.optionText}>High to Low</span>
            </li>
            <li className={styles.option} onClick={() => handleRatingSelection("Low to High")}>
              <span className={styles.optionText}>Low to High</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.postContainer}>
        { notFound ? <h1 className={styles.notFound}>No result found</h1>:
          searchedPost.map((search) => (
            <PostCard
              profile={search.profilePicture}
              key={search.postID}
              postID={search.postID}
              username={search.username}
              location={search.location}
              rating={search.rating}
              description={search.description}
              postimg={PUBLIC_FOLDER + search.images}
              date={search.createdAt}
            />
          )) 
        }
      </div>
    </div>
  );
};

export default Search;

