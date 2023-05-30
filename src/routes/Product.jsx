import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      await fetch(`http://localhost:7000/products/${productId}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    };

    getProduct();
  }, [productId]);

  return (
    <div className="view-frame white-bg">
      <h1>{product.name}</h1>
      <img className="prod-img" src={product.image} alt="" />
    </div>
  );
}

export default Product;
