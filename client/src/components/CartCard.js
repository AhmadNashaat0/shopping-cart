import React from "react";
import { useState } from "react";

const CartCard = ({ product, deleteMe, count }) => {
  const [counter, setCounter] = useState(product.count);
  const [totalPrice, setTotalPrice] = useState(product.count * product.price);

  const update = (num) => {
    if (counter + num < 1) return deleteMe(product.id);
    setCounter(counter + num);
    setTotalPrice(totalPrice + num * product.price);
    count(product.id, counter + num);
  };

  return (
    <div className="cartCard">
      <div className="imgCard"></div>
      <div className="cardDesc">
        <h1>{product.id}</h1>
        <p>{product.price}</p>
      </div>
      <div className="cardControl">
        <div className="cardControlCounter">
          <button onClick={() => update(1)}>+</button>
          <input
            type="number"
            value={counter}
            min="1"
            onClick={(e) => {
              e.target.select();
            }}
            onChange={(e) => {
              update(e.target.value - counter);
            }}
          />
          <button onClick={() => update(-1)}>
            {counter < 2 ? "del" : "-"}
          </button>
        </div>
        <h2>
          <span>price: </span>
          {totalPrice}
        </h2>
      </div>
    </div>
  );
};

export default CartCard;
