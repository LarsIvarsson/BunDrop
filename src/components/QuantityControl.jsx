import React from "react";

function QuantityControl(props) {
  function increaseQty() {
    props.changeQuantity(props.quantity + 1);
  }

  function decreaseQty() {
    if (props.quantity > 0) {
      props.changeQuantity(props.quantity - 1);
    }
  }

  return (
    <div>
      <h3>{props.totalPrice} kr</h3>
      <div className="quantity-ctrl">
        <button onClick={decreaseQty}>-</button>
        <span>{props.quantity}</span>
        <button onClick={increaseQty}>+</button>
      </div>
    </div>
  );
}

export default QuantityControl;
