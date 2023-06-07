import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SearchBar from "../components/SearchBar";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState({});
  const [id, setId] = useState(localStorage.getItem("signedInUser"));

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

  useEffect(() => {
    const getUser = async () => {
      await fetch(`http://localhost:7000/users/${id}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    };

    if (id) {
      getUser();
    }
  }, [id]);

  function filterProducts(filter) {
    const tempProducts = [...products].filter((p) => {
      if (p.name.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }
    });

    setFilteredProducts(tempProducts);
  }

  function markAsFavorite(id) {
    // check if product is favorite
    let favProd = user.favorites.find((p) => p.id === id);

    // if it is favorite
    if (favProd) {
      // remove from user favorites
      user.favorites = user.favorites.filter((f) => f.id !== id);
    } else {
      // add to favorites
      user.favorites.push({ id: id });
    }

    // save to db whit PUT request
    fetch(`http://localhost:7000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Favorite list updated");
        } else {
          console.log("Failed to change favorites array.");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  return (
    <div>
      <div className="text-center trans-bg">
        <SearchBar filterProducts={filterProducts} />
      </div>
      <div className="grid-container">
        {filteredProducts?.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            markAsFavorite={markAsFavorite}
            userFavorites={user.favorites}
          />
        ))}
      </div>
    </div>
  );
}
export default ProductList;
