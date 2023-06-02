import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let localItems = localStorage.getItem("shoppingCart");
    if (!localItems) {
      localItems = [];
    } else {
      setCartItems(JSON.parse(localItems));
    }
  }, []);

  function changeQuantity(id, quantity) {
    let itemToChange = cartItems.find((i) => i.id === id);
    itemToChange.quantity = quantity;

    if (quantity === 0) {
      cartItems.pop(itemToChange);
    }

    localStorage.setItem("shoppingCart", JSON.stringify(cartItems));

    // TODO: remove item from cart if qty = 0
    // gör det dynamiskt
  }

  if (cartItems.length > 0) {
    return (
      <div className="view-frame white-bg">
        {cartItems?.map((p) => (
          <CartItem key={p.id} product={p} changeQuantity={changeQuantity} />
        ))}
        <Link to="/betalning">
          <button className="order-btn">Betala</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="view-frame white-bg">
      <h2>
        Varukorgen är tom! Gå till<Link to="/meny">menyn</Link>
      </h2>
    </div>
  );
}

export default Cart;
