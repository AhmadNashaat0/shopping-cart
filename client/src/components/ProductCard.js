import React from "react";


const ProductCard = () => {
    return (
        <div className="productCard">
            <div className="productImage"></div>
            <div className="productData">
                <h1 className="productTitle">ProductName</h1>
                <p className="productDescription">
                    description
                </p>
                <p className="productPrice"> price: <span>100$</span></p>
                <button className="AddToCart">AddToCart</button>

            </div>
        </div>
    )
}

export default ProductCard