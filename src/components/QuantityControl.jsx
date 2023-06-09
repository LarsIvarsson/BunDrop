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
      <div className="quantity-ctrl flex-container justify-center">
        <button className="qty-btn" onClick={decreaseQty}>
          &#8722;
        </button>
        <span className="qty-num">{props.quantity}</span>
        <button className="qty-btn" onClick={increaseQty}>
          &#43;
        </button>
      </div>
    </div>
  );
}

export default QuantityControl;
