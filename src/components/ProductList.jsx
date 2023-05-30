import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await fetch("http://localhost:7000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    };
    getProducts();
  }, []);

  return (
    <div className="grid-container">
      {products?.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;
