import React, { useRef, useEffect, useState } from "react";

function Modal(props) {
  const modalRef = useRef(null);
  const [phoneNr, setPhoneNr] = useState(0);
  const [cardNr, setCardNr] = useState(0);
  const [cvvNr, setCvvNr] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      props.onClose();
    }
  };

  function handlePhoneNrChange(e) {
    setError("");
    setName(e.target.value);
  };
  function handleCardNrChange(e) {
    setError("");
    setName(e.target.value);
  };
  function handleCvvNrChange(e) {
    setError("");
    setName(e.target.value);
  };

  
  
  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-body" ref={modalRef}>
        {props.paymentMethod === 'Swish' && (
          <>
            <p>Swish-specific content</p>
            <hr />
          </>
        )}

        {props.paymentMethod === 'Kort' && (
          <>
            <p>Kort-specific content</p>
            <hr />
          </>
        )}
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
