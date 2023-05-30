import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
  if (props.product) {
    return (
      <Link to={`/produkter/${props.product.id}`}>
        <div className="grid-item white-bg">
          <img className="card-img" src={props.product.image} alt="" />
          <h2>{props.product.name}</h2>
          <button className="order-btn">
            <h2 className="btn-text">Beställ</h2>
          </button>
        </div>
      </Link>
    );
  } else {
    return (
      <div>
        <h2>Not found</h2>
      </div>
    );
  }
}

export default ProductCard;
