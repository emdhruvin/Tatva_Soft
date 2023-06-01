import React from "react";
import "./displayCard.css";

const DisplayCard = ({ data }) => {
  console.log(data);
  return (
    <div className="displayData__container">
      <div className="displayData__id">{data.id}</div>
      <div className="displayData__title">{data.title}</div>
      <div className="displayData__body">{data.body}</div>
    </div>
  );
};

export default DisplayCard;
