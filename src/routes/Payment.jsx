import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import useFetch from "../hooks/useFetch";

function Payment() {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState(localStorage.getItem("signedInUser"));
  const user = useFetch(`http://localhost:7000/users/${id}`, {});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let localItems = localStorage.getItem("shoppingCart");
    if (!localItems) {
      localItems = [];
    } else {
      setCartItems(JSON.parse(localItems));
    }
  }, []);

  function handleNameChange(e) {
    setError("");
    setName(e.target.value);
  }
  function handleAdressChange(e) {
    setError("");
    setAdress(e.target.value);
  }
  function handlePostalChange(e) {
    setError("");
    setPostal(e.target.value);
  }
  function handleCityChange(e) {
    setError("");
    setCity(e.target.value);
  }

  function validateInputs(e) {
    e.preventDefault();

    if (name.length < 5) {
      setError("Ditt namn måste innehålla 5 bokstäver");
    } else if (/\d/.test(name)) {
      setError("Ditt namn får inte innehålla siffror");
    } else if (
      adress.length < 6 ||
      !/\d/.test(adress) ||
      !/[a-öA-Ö]/i.test(adress)
    ) {
      setError("Din adress måste innehålla minst 5 bokstäver och 1 siffra");
    } else if (postal.trim().length !== 5 || !/^\d+$/.test(postal)) {
      setError(
        "Ditt postnummer får bara innehålla siffror och måste vara 5 siffror"
      );
    } else if (city.length < 3 || /\d/.test(city)) {
      setError("Stad måste vara minst 3 bokstäver och inte innehålla siffror");
    } else {
      setShow(true);
    }
  }

  const confirmPayment = async () => {
    let products = [];
    let totalPrice = 0;

    cartItems.forEach((i) => {
      totalPrice += i.price * i.quantity;
      products.push({ name: i.name, quantity: i.quantity });
    });

    try {
      await fetch("http://localhost:7000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: products, totalPrice: totalPrice }),
      });

      if (user.id) {
        // save to signed-in user order history
        user.orders.push({ products: products, totalPrice: totalPrice });

        const response = await fetch(`http://localhost:7000/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          console.log("Användarens beställningshistorik uppdaterad");
        } else {
          console.log("Något gick snett");
        }
      }

      localStorage.removeItem("shoppingCart");

      navigate(`/bekraftelse`);
    } catch (err) {
      console.error("Felmedd.: ", err);
    }
  };

  return (
    <div className="view-frame white-bg text-center">
      <h1>Uppgifter</h1>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        confirmPayment={confirmPayment}
      />

      <form onSubmit={validateInputs}>
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

        <p className="text-warning">{error}</p>

        <button className="no-btn" type="submit">
          <div className="payment-method">
            <span className="no-margin">Swish</span>
            <img className="swish-img" src="/images/logos/swish.jpg" alt="" />
          </div>
        </button>

        <button className="no-btn" type="submit">
          <div className="payment-method">
            <span className="no-margin">Kort</span>
            <img className="kort-img" src="/images/logos/cards.png" alt="" />
          </div>
        </button>
      </form>
    </div>
  );
}

export default Payment;
