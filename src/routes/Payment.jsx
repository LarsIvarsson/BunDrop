import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";

function Payment() {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [postal, setPostal] = useState("");
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let localItems = localStorage.getItem("shoppingCart");
    if (!localItems) {
      localItems = [];
    } else {
      setCartItems(JSON.parse(localItems));
    }
  }, []);

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
  function confirmPayment() {
    // save order to db.json
    let products = [];
    let totalPrice = 0;
    cartItems.forEach((i) => {
      totalPrice += i.price * i.quantity;
      products.push({ name: i.name, quantity: i.quantity });
    });

    fetch("http://localhost:7000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: products, totalPrice: totalPrice }),
    });

    // delete localStorage
    localStorage.removeItem("shoppingCart");

    // show confirmation page  (atm => menu page)
  }

  return (
    <div className="view-frame white-bg text-center">
      <h1>Uppgifter</h1>
      <Modal
        show={show}
        onClose={() => setShow(false)}
        confirmPayment={confirmPayment}
      />
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Namn" onChange={handleNameChange} />
        </div>
        <div>
          <input
            type="text"
            placeholder="Adress"
            onChange={handleAdressChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Postnummer"
            onChange={handlePostalChange}
          />
        </div>
        <div>
          <input type="text" placeholder="Stad" onChange={handleCityChange} />
        </div>
      </form>

      <button onClick={handleSubmit} className="no-btn" type="submit">
        <div className="swish">
          <span className="no-margin">Swish</span>
          <img className="swish-img" src="/images/logos/swish.jpg" alt="" />
        </div>
      </button>

      <button onClick={handleSubmit} className="no-btn" type="submit">
        <div className="kort">
          <span className="no-margin">Kort</span>
          <img className="kort-img" src="/images/logos/cards.png" alt="" />
        </div>
      </button>
    </div>
  );
}

export default Payment;
