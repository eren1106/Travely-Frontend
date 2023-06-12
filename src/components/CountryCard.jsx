import React, { useState } from "react";
import styles from '../styles/countrycard.module.css'
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const CountryCard = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const handleCardClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className={styles.card}>
      <img src={props.img} className={styles.cardImg} alt="" />
      <div className={styles.cardBody}>
        <h1 className={styles.cardTitle}>{props.country}</h1>
        <p className={styles.cardSubTitle}>{props.title}</p>
        <p className={styles.cardInfo}>
          {props.description}
        </p>
        <a href="#" className={styles.btn} onClick={handleCardClick}>
          <i>{isSelected ? <CloseOutlinedIcon /> : <CheckOutlinedIcon />}</i>
        </a>
      </div>
    </div>
  );
};

export default CountryCard;
