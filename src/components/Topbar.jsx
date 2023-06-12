import React from "react";
import styles from "../styles/topbar.module.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import logo from "../assets/logo.png"

const Topbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo for travely" />
        </div>

        <div className={styles.titleContainer}>
          <h2>Travely</h2>
        </div>
        <form className={styles.searchbarContainer}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className={styles.searchInput}
            />
            <a href="search-result.html" className={styles.searchBtn}>
              <i className={styles.searchIcon}><SearchOutlinedIcon/></i>
            </a>
          </div>
        </form>

        <div className={styles.iconContainer}>
          <ul>
            <a href="login.html">
              <li className={styles.listItem}>
                <i><LogoutOutlinedIcon/></i>
              </li>
            </a>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
