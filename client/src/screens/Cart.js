import React, { useState, useEffect } from "react";
import CartCard from "../components/CartCard";

const Cart = () => {
  const [totalPrice, setTotalPrices] = useState(0);
  const [cards, setcards] = useState([
    { id: 1, count: 1, price: 120 },
    { id: 2, count: 1, price: 130 },
    { id: 3, count: 3, price: 200 },
    { id: 4, count: 1, price: 90 },
    { id: 5, count: 2, price: 100 },
    { id: 6, count: 1, price: 150 },
  ]);

  useEffect(() => {
    var prices = 0;
    cards.forEach(({ count, price }) => {
      prices += price * count;
    });
    setTotalPrices(prices);
  });

  const deleteMe = (i) => {
    const newCards = cards.filter(({ id }) => id !== i);
    setcards(newCards);
  };
  const count = (i, c) => {
    const card = cards.findIndex(({ id }) => id === i);
    let newCards = [...cards];
    newCards[card].count = c;
    setcards(newCards);
  };

  return (
    <div className="cart">
      {cards.map((card) => (
        <CartCard
          key={card.id}
          product={card}
          deleteMe={deleteMe}
          count={count}
        />
      ))}
      <h2>total price : </h2>
      <h1>{totalPrice}</h1>
    </div>
  );
};

export default Cart;
