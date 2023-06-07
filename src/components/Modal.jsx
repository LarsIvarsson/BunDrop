import React from "react";

function Modal(props) {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-body">
        <p> Köplogik </p> <hr />
        <button className="green-btn" onClick={props.confirmPayment}>
          Köp
        </button>
        <button className="cancel-btn" onClick={props.onClose}>
          Ångra
        </button>
      </div>
    </div>
  );
}

export default Modal;
