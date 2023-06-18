import React from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../userContext";
import TopBar from "../components/Topbar";
import PostCard from "../components/PostCard";
import styles from "../styles/search.module.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useLocation } from 'react-router-dom';

const Search = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { searchResult , notFound} = location.state;


  const [searchedPost, setSearchedPost] = useState(searchResult);

  // sort post based on rating
  const sortPost = () => {
    if (selectedRating === "Low to High") {
      setSearchedPost((prevSearch) => {
        return [...prevSearch].sort((p1, p2) => {
          return p1.rating - p2.rating;
        });
      });
    } else if (selectedRating === "High to Low") {
      setSearchedPost((prevSearch) => {
        return [...prevSearch].sort((p1, p2) => {
          return p2.rating - p1.rating;
        });
      });
    }
  }
  // address to fecth images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  //dropdown menu for rating
  const [rating, setRating] = useState(false);
  const [selectedRating, setSelectedRating] = useState("Rating");
  const toggleRatingMenu = () => {
    setRating(!rating);
  };
  const handleRatingSelection = (optionText) => {
    setSelectedRating(optionText);
    setRating(false);
  };
 
  useEffect(() => {
    sortPost();
  }, [selectedRating]);

  // const [profile, setProfile] = useState("");
  // const [user, setUser] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  // address to fetch images
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const checkProfileExists = (profile) => {
    let defaultImg = "defaultProfile.jpeg";
    if (profile && profile.length) {
      defaultImg = profile;
    }
    return defaultImg;
  };


  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     await getUser();
  //     setIsLoading(false);
  //   };
  //   const getUser = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:3001/api/users/${userId}`
  //       );
  //       setUser(res.data);
  //       setProfile(checkProfileExists(res.data.profilePicture));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, [userId]);

  return (
    <div>
      <SideBar
        username={user.username}
        profile={`${PF}${checkProfileExists(user.profilePicture)}`}
        email={user.email}
      />
      <TopBar />

      <div className={styles.filterContainer}>
        <h2>Search Result :</h2>

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

