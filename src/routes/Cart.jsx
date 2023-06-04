import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let localItems = localStorage.getItem("shoppingCart");
    if (!localItems) {
      localItems = [];
    } else {
      setCartItems(JSON.parse(localItems));
      getTotalPrice();
    }
  }, []);

  function getTotalPrice() {
    let total = 0;
    cartItems.forEach((i) => {
      total += i.price * i.quantity;
    });
    setTotalPrice(total);
  }

  function changeQuantity(id, quantity) {
    let itemToChange = cartItems.find((i) => i.id === id);
    itemToChange.quantity = quantity;

    const updatedCartItems = cartItems.filter((i) => i.quantity > 0);
    setCartItems(updatedCartItems);
    getTotalPrice();
    localStorage.setItem("shoppingCart", JSON.stringify(updatedCartItems));
  }

  if (cartItems.length > 0) {
    return (
      <div className="view-frame white-bg text-center">
        {cartItems?.map((p) => (
          <CartItem key={p.id} product={p} changeQuantity={changeQuantity} />
        ))}
        <Link to="/betalning">
          <button className="green-btn">Betala</button>
          <p>Total: {totalPrice} kr</p>
        </Link>
      </div>
    );
  }
  return (
    <div className="view-frame white-bg">
      <h2>
        Varukorgen är tom! Gå till{" "}
        <Link className="link-style" to="/meny">
          menyn
        </Link>
      </h2>
    </div>
  );
}

export default Cart;
