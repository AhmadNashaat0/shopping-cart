import React from "react";
import { useState } from "react";

const CartCard = ({ name, deleteMe, count }) => {
  const [counter, setCounter] = useState(name.count);
  const [totalPrice, setTotalPrice] = useState(name.count * 150);

  const update = (num) => {
    if (counter + num < 1) return deleteMe(name[0]);
    setCounter(counter + num);
    setTotalPrice(totalPrice + num * 150);
    count(name.id, counter);
  };

  return (
    <div className="cartCard">
      <div className="imgCard"></div>
      <div className="cardDesc">
        <h1>{name.id}</h1>
        <p>description</p>
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
