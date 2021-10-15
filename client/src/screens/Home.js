import React from "react";
import HomeProduct from "../components/HomeProduct";

const Home = () => {
    return (
        <div>
            {/* Nav bar */}
            <div className="home">
                <h1>Products</h1>
                <div className="home-products">
                    <HomeProduct></HomeProduct>
                    <HomeProduct></HomeProduct>
                    <HomeProduct></HomeProduct>
                    <HomeProduct></HomeProduct>

                </div>
            </div>
        </div>
    )
}

export default Home