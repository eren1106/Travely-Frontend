import React from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import TopBar from "../components/Topbar";
import CreatePost from "../components/CreatePost";
import styles from "../styles/home.module.css";
import PostCard from "../components/PostCard";
import { CircularProgress } from "@mui/material";


const Home = () => {
  

  //mock user id
  const userID = "6481966c3137e182902f753d";

  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // address to fecth images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

 
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

      await getPosts();
      await getUser();

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

  return (
    <div>
      <SideBar loading={isLoading} username={user.username} profile = {PUBLIC_FOLDER + profile} email={user.email}/>
      <TopBar />
      <CreatePost loading={isLoading} profile = {PUBLIC_FOLDER + profile} username={user.username} />
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

export default Home;
