import React, { useState } from "react";

export default function InfoModal({ ...props }) {
  const [showModal, setShowModal] = useState();

	const handleClose = () => {
		setShowModal(false);
	}

  return (
    <div>
      <button onClick={() => setShowModal(true)}>View</button>

      {showModal && (
        <div
          className="flex flex-col align-center"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100vw",
            height: "50vh",
            backgroundColor: "white",
						color: "black",
            justifyContent: "space-around"
          }}
        >
          {props.children}
          <div className="flex flex-row justify-center">
            <button className="info-modal-button" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
