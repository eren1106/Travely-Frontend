import React from "react";
import styles from "../styles/sidenavigation.module.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import profile from '../assets/profile.jpg'
const SideBar = () => {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.profileContent}>
        <div className={styles.profile}>
          <img src='../assests/profile.jpg' alt="Profile picture" />
          <div className={styles.profileName}>Zheng Wu Bang</div>
          <hr />
          <p className={styles.userEmail}>wbzheng@gmail.com</p>
        </div>
      </div>

      <ul className={styles.navList}>
        <li>
          <a href="index.html">
            <i><HomeOutlinedIcon/></i>
            <span className="links_name">Home</span>
          </a>
        </li>
        <li>
          <a href="profile.html">
            <i><PersonOutlineOutlinedIcon/></i>
            <span className="links_name">Profile</span>
          </a>
        </li>

        <li>
          <a href="userAnalytics.html">
            <i><InsertChartOutlinedIcon/></i>
            <span className="links_name">User Analytics</span>
          </a>
        </li>

        <li className={styles.logoutContainer}>
          <a href="login.html" className={styles.logout}>
            <i><LogoutOutlinedIcon/></i>
            <span>Log Out</span>
          </a>
        </li>
      </ul>

    </nav>
  );
};

export default SideBar;
