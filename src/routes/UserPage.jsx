import React, { useState, useEffect } from "react";
import NotFound from "./NotFound";
import useFetch from "../hooks/useFetch";

function UserPage() {
  const [signedIn, setSignedIn] = useState(false);
  const [id, setId] = useState(localStorage.getItem("signedInUser"));
  const user = useFetch(`http://localhost:7000/users/${id}`, {});

  useEffect(() => {
    if (id) {
      setSignedIn(true);
    }
  }, [id]);

  if (signedIn && user && user.orders && user.favorites) {
    return (
      <div className="view-frame white-bg user-display">
        <div>
          <h2>Tidigare beställningar:</h2>
          <ul>
            {user.orders.length > 0 ? (
              user.orders.map((o) => (
                <li key={o.totalPrice} className="order-display">
                  {o.products.map((p) => (
                    <h2 key={p.name}>
                      {p.quantity} st. {p.name}
                    </h2>
                  ))}
                  <em>Total: {o.totalPrice} kr</em>
                </li>
              ))
            ) : (
              <p>No orders placed yet...</p>
            )}
          </ul>
        </div>
        <div>
          <h2>Dina favoritprodukter:</h2>
          {user.favorites.length > 0 ? (
            user.favorites.map((f) => <p key={f.id}>{f.name}</p>)
          ) : (
            <p>No favorites added yet...</p>
          )}
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}

export default UserPage;
