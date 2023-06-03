import React from "react";
import "./displayCard.css";

const DisplayCard = ({ data, idx }) => {
  return (
    <div key={idx} className="displayData__container">
      <div className="displayData__id">{data.name}</div>
      <div className="displayData__cat">{data.category}</div>
      <img
        className="displayData__img"
        src={data.base64image}
        alt="book cover"
      />
      <div className="displayData__price">{data.price}₹</div>
      <div className="displayData__body">{data.description}</div>
      <button className="displayData__cartBtn">ADD TO CART</button>
    </div>
  );
};

export default DisplayCard;
