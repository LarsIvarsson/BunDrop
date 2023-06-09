import React, { useRef, useEffect } from "react";

function Modal(props) {
  const modalRef = useRef(null);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!props.show) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-body" ref={modalRef}>
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
