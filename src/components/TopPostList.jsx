import React, { useState, useEffect, useContext } from "react";
import "../styles/analytics.css";
import TopPostItem from "./TopPostItem";
import axios from "axios";

const TopPost = (props) => {
  // view more handle function
  const [showAllPosts, setShowAllPosts] = useState(false);
  const initialPostCount = 5;
  const handleViewMore = () => {
    setShowAllPosts(true);
  };

  const handleViewLess = () => {
    setShowAllPosts(false);
  };

  // const { post } = props;
  // console.log(post);

  // set the number of the posts

  const displayedPosts =
    showAllPosts || !props.post || props.post.length <= initialPostCount
      ? props.post || []
      : props.post.slice(0, initialPostCount);
  //console.log(displayedPosts);
  return (
    <div className="container">
      <div className="row">
        <div className="col-top-post">
          <div>
            <p className="title">Top Posts</p>
          </div>
        </div>
      </div>
      <div className="table-top-posts">
        <table>
          <thead>
            <tr>
              <th>
                <p className="title-table">No</p>
              </th>
              <th>
                <p className="title-table">Posts</p>
              </th>
              <th>
                <p className="title-table">Rating</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedPosts.map((post,index) => (
              <TopPostItem
                key={post.postID}
                description={post.description.length > 50 ? post.description.substring(0, 40) + " ...": post.description}
                images={post.images}
                rating={post.rating}
                postNum = {index+1}
              />
              
            ))}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col-view-more">
          {showAllPosts ? (
            <p className="view-more" onClick={handleViewLess}>
              View Less...
            </p>
          ) : (
            <p className="view-more" onClick={handleViewMore}>
              View More...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPost;
