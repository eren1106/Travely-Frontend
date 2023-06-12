import React, { useState, useEffect } from 'react';
import '../styles/analytics.css';
import ViewsChart from '../components/ViewsChart';
import PostReach from '../components/PostReach';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Travely = () => {
  const { id } = useParams();
  const [initialLoading, setInitialLoading] = useState(true);
  const [postData, setPostData] = useState(null);
  const [visitors, setVisitors] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setInitialLoading(true);

      try {
        await fetchPostData();
        await fetchRating();
        await fetchVisitors();
        await fetchTotalPosts();
      } catch (err) {
        console.log(err);
      }

      setInitialLoading(false);
    };

    const fetchPostData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}`);
        setPostData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchVisitors = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}/visitors`);
        setVisitors(res.data.visitors);
        console.log(res.data.visitors);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTotalPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}/totalPosts`);
        setTotalPosts(res.data.totalPosts);
        console.log(res.data.totalPosts);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchRating = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}/rating/${"testuserID69"}`);
        setRating(res.data.rating);
        console.log(res.data.rating);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <main>
        <div className="section">
          <div className="row">
            <div className="column">
              <div className="icon1">
                <img src="assets/total-visitors.png" alt="" />
              </div>
              <div className="content">
                <p className="total">Visitors (Today)</p>
                <p className="num">{visitors}</p>
              </div>
            </div>
            <div className="column">
              <div className="icon2">
                <img src="assets/total-posts.png" alt="" />
              </div>
              <div className="content">
                <p className="total">Total Posts</p>
                <p className="num">{totalPosts}</p>
              </div>
            </div>
            <div className="column">
              <div className="icon4">
                <img src="assets/rating.png" alt="" />
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
                  <ViewsChart />
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
                  <PostReach />
                </div>
              </div>
            </div>
          </div>

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
                {postData &&
                  postData.map((post, index) => (
                    <tr key={post.id}>
                      <td>
                        <div className="number-of-post">
                          <p className="text">{index + 1}</p>
                        </div>
                      </td>
                      <td>
                        <div className="posts">
                          <div className="image">
                            <img src={post.image} alt="" />
                          </div>
                          <p className="title-of-post">{post.title}</p>
                        </div>
                      </td>
                      <td>
                        <p className="text">{post.rating}/5.0</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="row">
              <div className="col-view-more">
                <p className="view-more">View More...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Travely;