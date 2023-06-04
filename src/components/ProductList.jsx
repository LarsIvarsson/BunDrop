import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "../components/SearchBar";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      await fetch("http://localhost:7000/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        });
    };
    getProducts();
  }, []);

  function filterProducts(filter) {
    const tempProducts = [...products].filter((p) => {
      if (p.name.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
    });

    setFilteredProducts(tempProducts);
  }

  return (
    <div>
      <div className="text-center trans-bg">
        <SearchBar filterProducts={filterProducts} />
      </div>
      <div className="grid-container">
        {filteredProducts?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
