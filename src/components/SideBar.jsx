import React from "react";
import styles from "../styles/sidenavigation.module.css";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SideBar = (props) => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('user');
  }
  return (
    <nav className={styles.sidebar}>
      <div className={styles.profileContent}>
          <div className={styles.profile}>
          {props.loading ? <CircularProgress/> : <>
            <img src={props.profile} alt="Profile picture" />
            <div className={styles.profileName}>{props.username}</div>
            <hr />
            <p className={styles.userEmail}>{props.email}</p>
            </>
          }
          </div>  
      </div>

      <ul className={styles.navList}>
        <li>
          <Link to="/" >
            <i><HomeOutlinedIcon/></i>
            <span className="links_name">Home</span>
          </Link>
        </li>
        <li>
          <a href="profile.html">
            <i><PersonOutlineOutlinedIcon/></i>
            <span className="links_name">Profile</span>
          </a>
        </li>

        <li>
          <Link to="/analytics">
            <i><InsertChartOutlinedIcon/></i>
            <span className="links_name">User Analytics</span>
          </Link>
        </li>

        <li className={styles.logoutContainer}>
          <Link to="/login" className={styles.logout} onClick={handleLogout}>
            <i><LogoutOutlinedIcon/></i>
            <span>Log Out</span>
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default SideBar;
