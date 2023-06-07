import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

function Payment() {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState(localStorage.getItem("signedInUser"));
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let localItems = localStorage.getItem("shoppingCart");
    if (!localItems) {
      localItems = [];
    } else {
      setCartItems(JSON.parse(localItems));
    }
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

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAdressChange(e) {
    setAdress(e.target.value);
  }
  function handlePostalChange(e) {
    setPostal(e.target.value);
  }
  function handleCityChange(e) {
    setCity(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (name !== "" && adress !== "" && city !== "" && postal !== "")
      setShow(true);
  }

  const confirmPayment = async () => {
    let products = [];
    let totalPrice = 0;

    cartItems.forEach((i) => {
      totalPrice += i.price * i.quantity;
      products.push({ name: i.name, quantity: i.quantity });
    });

    await fetch("http://localhost:7000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products: products, totalPrice: totalPrice }),
    });

    if (user.id) {
      user.orders.push({ products: products, totalPrice: totalPrice });
      fetch(`http://localhost:7000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.ok) {
            console.log("User order history updated");
          } else {
            console.log("Failed to save order");
          }
        })
        .catch((error) => {
          console.error("Error: ", error);
        });
    }

    await localStorage.removeItem("shoppingCart");

    navigate(`/bekraftelse`);
  };

  return (
    <div className="view-frame white-bg text-center">
      <h1>Uppgifter</h1>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        confirmPayment={confirmPayment}
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">För- och efternamn:</label>
        <div>
          <input
            id="name-input"
            className="input-field"
            type="text"
            placeholder="För- och efternamn:"
            onChange={handleNameChange}
          />
        </div>
        <label htmlFor="adress-input">Adress:</label>

        <div>
          <input
            id="adress-input"
            className="input-field"
            type="text"
            placeholder="Adress"
            onChange={handleAdressChange}
          />
        </div>
        <label htmlFor="postal-input">Postnummer:</label>

        <div>
          <input
            id="postal-input"
            className="input-field"
            type="number"
            placeholder="Postnummer"
            onChange={handlePostalChange}
          />
        </div>
        <label htmlFor="city-input">Stad:</label>
        <div>
          <input
            id="city-input"
            className="input-field"
            type="text"
            placeholder="Stad"
            onChange={handleCityChange}
          />
        </div>
      </form>

      <button onClick={handleSubmit} className="no-btn" type="submit">
        <div className="payment-method">
          <span className="no-margin">Swish</span>
          <img className="swish-img" src="/images/logos/swish.jpg" alt="" />
        </div>
      </button>

      <button onClick={handleSubmit} className="no-btn" type="submit">
        <div className="payment-method">
          <span className="no-margin">Kort</span>
          <img className="kort-img" src="/images/logos/cards.png" alt="" />
        </div>
      </button>
    </div>
  );
}

export default Payment;
