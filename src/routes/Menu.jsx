import React from "react";
import ProductList from "../components/ProductList";

function Menu() {
  return (
    <div>
      <div className="text-center trans-bg">
        <span>Burgers</span> <span>Sides</span> <span>Drinks</span>
      </div>
      <ProductList />
    </div>
  );
}

export default Menu;
