import React, { useState, useEffect } from 'react';
import ViewsChart from '../components/ViewsChart';
import PostReach from '../components/PostReach';
import SideBar from '../components/SideBar';
import TopBar from '../components/Topbar';
import styles from "../styles/analytics.module.css";
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
      <SideBar/>
      <TopBar/>
      <main>
        <div className={styles.section}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.icon1}>
                <img src="assets/total-visitors.png" alt="" />
              </div>
              <div className={styles.content}>
                <p className={styles.total}>Visitors (Today)</p>
                <p className={styles.num}>{visitors}</p>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.icon2}>
                <img src="assets/total-posts.png" alt="" />
              </div>
              <div className={styles.content}>
                <p className={styles.total}>Total Posts</p>
                <p className={styles.num}>{totalPosts}</p>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.icon3}>
                <img src="assets/rating.png" alt="" />
              </div>
              <div className={styles.content}>
                <p className={styles.total}>Rating</p>
                <p className={styles.num}>{rating}/5.0</p>
              </div>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.row}>
              <div className=''>
                <div>
                  <p className={styles.title}>View Reach</p>
                </div>
                <div>
                  <ViewsChart />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.row}>
              <div className=''>
                <div>
                  <p className={styles.title}>Post Reach</p>
                </div>
                <div>
                  <PostReach />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.row}>
              <div className="col-top-post">
                <div>
                  <p className={styles.title}>Top Posts</p>
                </div>
              </div>
            </div>
            <div className={styles.tableTopPosts}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <p className={styles.titleTable}>No</p>
                    </th>
                    <th>
                      <p className={styles.titleTable}>Posts</p>
                    </th>
                    <th>
                      <p className={styles.titleTable}>Rating</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                {postData &&
                  postData.map((post, index) => (
                    <tr key={post.id}>
                      <td>
                        <div className="number-of-post">
                          <p className={styles.text}>{index + 1}</p>
                        </div>
                      </td>
                      <td>
                        <div className={styles.posts}>
                          <div className={styles.image}>
                            <img src={post.image} />
                          </div>
                          <p className={styles.postDescription}>{post.description}</p>
                        </div>
                      </td>
                      <td>
                        <p className={styles.text}>{post.rating}/5.0</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.row}>
              <div className={styles.colViewMore}>
                <p className={styles.viewMore}>View More...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Travely;