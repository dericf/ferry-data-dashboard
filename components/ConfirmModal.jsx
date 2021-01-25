import React, { useState } from "react";

export default function ConfirmModal({ message = null, onConfirm }) {
  const [showModal, setShowModal] = useState();

	const handleConfirm = () => {
		setShowModal(false);
		onConfirm()
	}

  return (
    <div>
      <button onClick={() => setShowModal(true)}>X</button>

      {showModal && (
        <div
          className="flex flex-col justify-center align-center"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100vw",
            height: "50vh",
            backgroundColor: "white",
						color: "black"
          }}
        >
          <h1>Testing</h1>
          <p>{message ? message : "Are you sure you want to continue?"} </p>
          <div className="flex flex-row justify-center">
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={handleConfirm}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}
