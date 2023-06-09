import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuantityControl from "../components/QuantityControl";
import useFetch from "../hooks/useFetch";

function Product() {
  const { productId } = useParams();
  const product = useFetch(`http://localhost:7000/products/${productId}`, {});
  const [quantity, setQuantity] = useState(1);

  function addToCart() {
    let shoppingCart = localStorage.getItem("shoppingCart");
    let cartItem;

    if (!shoppingCart) {
      shoppingCart = [];
    } else {
      shoppingCart = JSON.parse(shoppingCart);
      cartItem = shoppingCart.find((i) => i.id === product.id);
    }

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = product;
      cartItem.quantity = quantity;
      shoppingCart.push(cartItem);
    }
    if (quantity > 0) {
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  }

  function changeQuantity(quantity) {
    setQuantity(quantity);
  }

  if (product) {
    return (
      <div className="view-frame white-bg text-center">
        <h1>{product.name}</h1>
        <div>
          <img className="prod-img" src={product.image} alt="" />
        </div>
        <em>{product.description}</em>

        <QuantityControl
          totalPrice={product.price * quantity}
          quantity={quantity}
          changeQuantity={changeQuantity}
        />

        {quantity > 0 ? (
          <button onClick={addToCart} className="order-btn">
            <h2 className="btn-text">Beställ</h2>
          </button>
        ) : (
          <button className="green-btn">
            <h2 className="btn-text">Beställ</h2>
          </button>
        )}
      </div>
    );
  }
  return (
    <div>
      <h1>Product not found...</h1>
    </div>
  );
}

export default Product;
