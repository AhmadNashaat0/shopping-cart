import React from "react";

const HomeProduct = () => {
    return (
        <div className="home-product">
            <div className="productImage">
                <img></img>
            </div>
            <div className="productData">
                <h1 className="productTitle">ProductName</h1>
                <p className="productPrice"> price: <span>100$</span></p>
                <button className="AddToCart">View</button>

            </div>
        </div>
    )
}

export default HomeProduct