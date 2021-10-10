import React, { useState, useEffect } from "react";
import CartCard from "../components/CartCard";

const Cart = () => {
  const [totalPrice, setTotalPrices] = useState(0);
  const [cards, setcards] = useState([
    { id: 1, count: 1 },
    { id: 2, count: 1 },
    { id: 3, count: 3 },
    { id: 4, count: 1 },
    { id: 5, count: 1 },
    { id: 6, count: 1 },
  ]);

  useEffect(() => {
    var price = 0;
    cards.forEach((card) => {
      price += 150 * card.count;
    });
    setTotalPrices(price);
  });

  const deleteMe = (i) => {
    const newCards = cards.filter((card) => card.id !== i);
    setcards(newCards);
  };
  const count = (i, c) => {
    const card = cards.findIndex((e) => e.id === i);
    let newCards = [...cards];
    newCards[card].count = c;
    setcards(newCards);
    console.log(cards);
  };

  return (
    <div className="cart">
      {cards.map((card) => (
        <CartCard
          key={card.id}
          name={card}
          deleteMe={deleteMe}
          count={count}
          setTotalPrices={setTotalPrices}
        />
      ))}
      <h2>total price : </h2>
      <h1>{totalPrice}</h1>
    </div>
  );
};

export default Cart;
