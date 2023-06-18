import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styles/analytics.css";
import ViewsChart from "../components/ViewsChart";
import PostReach from "../components/PostReach";
import SideBar from "../components/SideBar";
import TopBar from "../components/Topbar";
import { UserContext } from "../userContext";
import TopPost from "../components/TopPostList";
import { CircularProgress } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

const Travely = () => {

  // address to fecth images
  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  //context API to get userID
  const { user } = useContext(UserContext);
  //mock user id
  const userId = user._id;
  console.log(userId);
  const checkProfileExists = (profile) => {
    let defaultImg = "defaultProfile.jpeg";
    if (profile && profile.length) {
      defaultImg = profile;
    }
    return defaultImg;
  };

  //fetch all user post
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [view,setView] = useState([]);
  const [filteredView, setFilteredView] = useState();
  const [rating, setRating] = useState();
  const [profileView, setProfileView] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getPosts();
      await getView();
      await getProfileView();
      setIsLoading(false);
    };
    const getView = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/posts/${userId}/view`
        );
        const viewList = res.data;
        //console.log(viewList);
        const dates = viewList.map(({ date }) => date);
        setView(dates);  
        // Get today's date on local timezone
        const today = new Date();
        const timeZoneOffset = today.getTimezoneOffset() * 60000; // Get the time zone offset in milliseconds
        const localISOTime = new Date(today - timeZoneOffset).toISOString().split("T")[0];
        // console.log(localISOTime);

        // Filter the views array based on today's date
        const filteredViews = viewList.filter((view) => view.date === localISOTime);
        setFilteredView(filteredViews.length);
        //console.log(filteredViews);
      } catch (error) {
        console.log(error);
      }
    };

    const getProfileView = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/posts/${userId}/profileView`
        );
        const profileViewList = res.data;
        //console.log(profileViewList);
        const dates = profileViewList.map(({ date }) => date);
        setProfileView(dates);  
      } catch (error) {
        console.log(error);
      }
    };

    const getPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/posts/user/${userId}`
        );
        const userPost = response.data;

        // Sort the post based on rating
        const sortedPosts = userPost.sort((p1, p2) => p2.rating - p1.rating);
        setPosts(sortedPosts);

        // Calculate rating
        const totalRating = userPost.reduce(
          (total, post) => total + parseFloat(post.rating),
          0
        );
        const averageRating =
          sortedPosts.length > 0
            ? (totalRating / sortedPosts.length).toFixed(2)
            : "N/A";
        setRating(averageRating);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <main>
        <SideBar
          username={user.username}
          profile={`${PUBLIC_FOLDER}${checkProfileExists(user.profilePicture)}`}
          email={user.email}
        />
        <TopBar />
        <div className="section">
          {isLoading ? (
            <CircularProgress className="loadingAnalytics" />
          ) : (
            <>
              <div className="row">
                <div className="column">
                  <div className="icon1" fontSize='large'>
                    <VisibilityOutlinedIcon/>
                  </div>
                  <div className="content">
                    <p className="total">Visitors (Today)</p>
                    <p className="num">{filteredView}</p>
                  </div>
                </div>
                <div className="column">
                  <div className="icon2">
                    <ImportContactsTwoToneIcon/>
                  </div>
                  <div className="content">
                    <p className="total">Total Posts</p>
                    <p className="num">{posts.length}</p>
                  </div>
                </div>
                <div className="column">
                  <div className="icon4">
                    <StarBorderOutlinedIcon/>
                  </div>
                  <div className="content">
                    <p className="total">Rating</p>
                    <p className="num">{rating}/5.0</p>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-view-reach">
                    <div>
                      <p className="title">View Reach</p>
                    </div>
                    <div>
                      <ViewsChart profileview={profileView}/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-post-reach">
                    <div>
                      <p className="title">Post Reach</p>
                    </div>
                    <div>
                      <PostReach view={view}/>
                    </div>
                  </div>
                </div>
              </div>
              <TopPost post={posts} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Travely;
