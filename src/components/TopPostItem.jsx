import React from "react";
import '../styles/analytics.css';
const TopPostItem = (props) => {

  // address to fecth images
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  const { postNum, description, images, rating } = props;

  return (
    <tr>
      <td>
        <div className="list-of-post">
          <p className="text">{postNum}</p>
        </div>
      </td>
      <td>
        <div className="posts">
          <div className="image">
            <img src={PF + images} alt="" />
          </div>
          <p className="title-of-post">
            {description}
          </p>
        </div>
      </td>
      <td>
        <p className="text">{rating}/5.0</p>
      </td>
    </tr>
  );
};

export default TopPostItem;
