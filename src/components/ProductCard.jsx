import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farfaStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasfaStar } from "@fortawesome/free-solid-svg-icons";

function ProductCard(props) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    props.markAsFavorite(props.product.id, fav);
  }, [fav]);

  if (props.product) {
    return (
      <div className="grid-item white-bg">
        <div>
          {fav ? (
            <FontAwesomeIcon
              onClick={() => setFav(!fav)}
              icon={fasfaStar}
              style={{ color: "green" }}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => setFav(!fav)}
              icon={farfaStar}
              style={{ color: "green" }}
            />
          )}
        </div>
        <img className="card-img" src={props.product.image} alt="" />
        <h2>{props.product.name}</h2>
        <Link to={`/produkter/${props.product.id}`}>
          <button className="green-btn">
            <h2 className="btn-text">Beställ</h2>
          </button>
        </Link>
      </div>
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
