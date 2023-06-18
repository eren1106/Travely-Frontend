import React from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useState, useEffect, useContext } from "react";
import TopBar from "../components/Topbar";
import CreatePost from "../components/CreatePost";
import styles from "../styles/home.module.css";
import PostCard from "../components/PostCard";
import { CircularProgress } from "@mui/material";
import { UserContext } from "../userContext";

const Home = () => {

  const [posts, setPosts] = useState([]);
  // const [profile, setProfile] = useState("");
  // const [users, setUser] = ueState({});
  const [isLoading, setIsLoading] = useState(false);

  //context API to get user data
  const { user } = useContext(UserContext);

  // const [user, setUser] = useState(null);
  
  // address to fetch images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

 
  const checkProfileExists = (profile) => {
    let defaultImg = "defaultProfile.jpeg";
    if (profile && profile.length) {
      defaultImg = profile;
    }
    return defaultImg;
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getPosts();
      // await getUser();
      // await getUser();
      setIsLoading(false);
    };
    const getPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/posts");
        const posts = response.data;
        console.log(posts);
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

    // const getUser = async () => {
    //   try {
    //     const currentUserID = localStorage.getItem("currentUserID");
    //     const res = await axios.get(
    //       `http://localhost:3001/api/users/${id}`
    //     );
    //     console.log("USER", id);
    //     userData = res.data;
    //     setUser(userData);

    //     console.log("USER DATA", userData);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    fetchData();
  },[]);

  
  return (
    <div>
      <SideBar username={user.username} profile = {`${PUBLIC_FOLDER}${checkProfileExists(user.profilePicture)}`} email={user.email}/>
      <TopBar />
      <CreatePost profile = {`${PUBLIC_FOLDER}${checkProfileExists(user.profilePicture)}`} username={user.username} />
      <div className={styles.postContainer}>
        {isLoading ? (
          <CircularProgress className={styles.loading} />
        ) : (
          posts.map((post) => (
            <PostCard
              profile={post.profilePicture}
              key={post.postID}
              userID={post.userID}
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

export default Home;
