import React from "react";
import ProductList from "../components/ProductList";

function Menu() {
  return (
    <div>
      <div className="text-center trans-bg">
        <h1>Sökruta</h1>
      </div>
      <ProductList />
    </div>
  );
}

export default Menu;
