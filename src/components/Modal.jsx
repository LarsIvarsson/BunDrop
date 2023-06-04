import React from "react";
import { Link } from "react-router-dom";
function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-body">
        <p> Köplogik </p> <hr />
        {/* Länken ska gå till bekräftelsesida */}
        <Link to="/meny">
          <button className="green-btn" onClick={props.confirmPayment}>
            Köp
          </button>
        </Link>
        <button className="cancel-btn" onClick={props.onClose}>
          Ångra
        </button>
      </div>
    </div>
  );
}

export default Modal;
