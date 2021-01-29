import React, { useEffect, useState } from "react";

export default function InfoModal({
  triggerText = "View",
  disabled = null,
  titleText = null,
  onOpen = () => {},
  ...props
}) {
  const [showModal, setShowModal] = useState();

  useEffect(() => {
    if(showModal === true) {
      onOpen();
    }
  }, [showModal])

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClick = async () => {
    setShowModal(true);
  };

  return (
    <>
      <button className="button-secondary" disabled={disabled} onClick={handleClick}>
        {triggerText}
      </button>

      {showModal && (
        <div
          className="flex flex-col justify-between align-center modal"
        >
          {titleText && (
            <div className="modal-title-bar">
              <span className="modal-close-icon" onClick={handleClose}>X</span>
              <h2 className="text-center">
                {titleText}
              </h2>
            </div>
          )}
          <div className="modal-content">{props.children}</div>
          <div className="flex flex-row justify-center modal-action-bar">
            <button className="button-error" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
