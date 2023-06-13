import React, { useState } from 'react';
import '../styles/analytics.css';
import ViewsChart from '../components/ViewsChart';
import PostReach from '../components/PostReach';

const Travely = () => {
  const [selectedView, setSelectedView] = useState('month'); 
  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

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
                <p className="num">1000</p>
              </div>
            </div>
            <div className="column">
              <div className="icon2">
                <img src="assets/total-posts.png" alt="" />
              </div>
              <div className="content">
                <p className="total">Total Posts</p>
                <p className="num">14,567</p>
              </div>
            </div>
            <div className="column">
              <div className="icon4">
                <img src="assets/rating.png" alt="" />
              </div>
              <div className="content">
                <p className="total">Rating</p>
                <p className="num">4.0/5.0</p>
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
                <ViewsChart selectedView={selectedView} />
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
                  <PostReach/>
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
                  <tr>
                    <td>
                      <div className="list-of-post">
                        <p className="text">01</p>
                      </div>
                    </td>
                    <td>
                      <div className="posts">
                        <div className="image">
                          <img src="assets/Bali.jpeg" alt="" />
                        </div>
                        <p className="title-of-post">Discover the Magic of Bali: A Journey to Paradise.</p>
                      </div>
                    </td>
                    <td>
                      <p className="text">5.0/5.0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="number-of-post">
                        <p className="text">02</p>
                      </div>
                    </td>
                    <td>
                      <div className="posts">
                        <div className="image">
                          <img src="assets/balloonView.jpg" alt="" />
                        </div>
                        <p className="title-of-post">Explore the Rich History and Culture of Turkey: A Journey to the Crossroads of East and West.</p>
                      </div>
                    </td>
                    <td>
                      <p className="text">4.9/5.0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="number-of-post">
                        <p className="text">03</p>
                      </div>
                    </td>
                    <td>
                      <div className="posts">
                        <div className="image">
                          <img src="assets/china-scene.jpg" alt="" />
                        </div>
                        <p className="title-of-post">Journey through Time and Tradition: Experience the Wonders of China.</p>
                      </div>
                    </td>
                    <td>
                      <p className="text">4.5/5.0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="number-of-post">
                        <p className="text">04</p>
                      </div>
                    </td>
                    <td>
                      <div className="posts">
                        <div className="image">
                          <img src="assets/australia-scene.jpeg" alt="" />
                        </div>
                        <p className="title-of-post">Adventure Down Under: Discovering the Natural Wonders of Australia.</p>
                      </div>
                    </td>
                    <td>
                      <p className="text">4.3/5.0</p>
                    </td>
                  </tr>
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