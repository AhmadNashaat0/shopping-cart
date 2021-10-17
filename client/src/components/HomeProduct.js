import React from "react";

const HomeProduct = ({ title, price }) => {
  return (
    <div className="home-product">
      <div className="productImage">
        <img></img>
      </div>
      <div className="productData">
        <h1 className="productTitle">{title}</h1>
        <p className="productPrice">
          {" "}
          price: <span>{price}</span>
        </p>
        <button className="AddToCart">View</button>
      </div>
    </div>
  );
};

export default HomeProduct;
