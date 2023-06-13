import React from 'react';
import { CircularProgress } from '@mui/material';
import styles from '../styles/loadingOverlay.module.css';

const LoadingOverlay = ({ loading }) =>
  loading && (
    <div className={styles.wrapper}>
      <h1 className={styles.text}>Loading...</h1>
      <CircularProgress sx={{
        color: "white",
      }}/>
    </div>
  );

export default LoadingOverlay;