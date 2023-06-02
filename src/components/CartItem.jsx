import React, { useState } from "react";
import QuantityControl from "./QuantityControl";

function CartItem(props) {
  const [quantity, setQuantity] = useState(props.product.quantity);

  function changeQuantity(quantity) {
    setQuantity(quantity);
    props.changeQuantity(props.product.id, quantity);
  }

  return (
    <div className="cart-item">
      <img className="cart-img" src={props.product.image} alt="" />
      <p>{props.product.name}</p>
      <QuantityControl
        totalPrice={props.product.price * quantity}
        quantity={quantity}
        changeQuantity={changeQuantity}
      />
    </div>
  );
}

export default CartItem;
