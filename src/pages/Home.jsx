import React from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { useState, useEffect } from "react";
import TopBar from "../components/Topbar";
import CreatePost from "../components/CreatePost";
import styles from "../styles/home.module.css";
import PostCard from "../components/PostCard";
import { CircularProgress } from '@mui/material';
import LoadingOverlay from "../components/LoadingOverlay";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  // address to fecth images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  
  const getPosts = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <SideBar />
      <TopBar />
      <CreatePost />
      <div className={styles.postContainer}>
        {
        posts.map((post) => (
          <PostCard
            key={post.postID}
            username={post.username}
            location={post.location}
            rating={post.rating}
            description={post.description}
            postimg={PUBLIC_FOLDER + post.images}
            date={post.createdAt}
          />
        ))}
        {/* LOADING OVERLAY */}
      <LoadingOverlay loading={isLoading} />
      </div>
    </div>
  );
};

export default Home;
