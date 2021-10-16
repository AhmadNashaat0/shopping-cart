import React, { useState, useEffect } from 'react';
import HomeProduct from "../components/HomeProduct";
import * as ProductAPI from "../API/ProductAPI"
const Home = () => {
    const [HomeProducts, setHomeProducts] = useState([]);

    useEffect(async () => {
        const data = await ProductAPI.getAll();
        setHomeProducts(Object.values(data))
        console.log(HomeProducts);
    })
    return (
        <div>
            {/* Nav bar */}
            <div className="home">
                <h1>Products</h1>
                <div className="home-products">
                    {HomeProducts.length > 0 && HomeProducts.map(product => (
                        <HomeProduct
                            key={product.id}
                            title={product.name}
                            price={product.price}

                        />
                    )

                    )}

                </div>
            </div>
        </div>
    )
}

export default Home