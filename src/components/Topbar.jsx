import React from "react";
import styles from "../styles/topbar.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Topbar = () => {

  //navigate to post page
  const navigate = useNavigate();
  const handleClick = () =>{
    if (searchResult.length === 0){
      navigate("/search" , { state: { searchResult , notFound:true} });
    }else {
      navigate("/search" , { state: { searchResult , notFound:false} });
    }
  }

  // address to fecth images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // search function
  const [input, setInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  // set timer on user input
  let timeoutId;
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Clear the previous timeout if it exists
    //clearTimeout(timeoutId);
    // Delay the execution of setInput by 3 seconds
    //timeoutId = setTimeout(() => {
      setInput(inputValue);
      //console.log(inputValue);
    //}, 1000);
  };

  const searchPatternMatched = (post) => {
    const inputValue = input.toLowerCase().trim();
    const postDescription = post.description.toLowerCase();
    const postUsername = post.username.toLowerCase();
    const postLocation = post.location.toLowerCase();
    if (inputValue.length === 0){
      return true;
    }
    if (postDescription.includes(inputValue) ||postUsername.includes(inputValue) ||postLocation.includes(inputValue)) {
      return true;
    }
    return false;
  };

  //fetch data
  useEffect(() => {
    const fetchData = async () => {
      await getPosts();
      console.log(searchResult);
    };
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/posts");
        const posts = response.data;
        //console.log(posts);
        setSearchResult(
          posts.filter((post) => {
            if (searchPatternMatched(post)) {
              return post;
            }
          })
        );  
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [input]);
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img src={PUBLIC_FOLDER + "logo.png"} alt="logo for travely" />
        </div>

        <div className={styles.titleContainer}>
          <h2>Travely</h2>
        </div>
        <form className={styles.searchbarContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className={styles.searchInput}
              onChange={handleInputChange}
            />
            <a className={styles.searchBtn} onClick={handleClick}>
              <i className={styles.searchIcon}>
                <SearchOutlinedIcon />
              </i>
            </a>
          </div>
        </form>

        <div className={styles.iconContainer}>
          <ul>
            <Link to="/login">
              <li className={styles.listItem}>
                <i>
                  <LogoutOutlinedIcon />
                </i>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
