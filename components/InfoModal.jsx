import React, { useEffect, useState } from "react";

export default function InfoModal({
  triggerText = "View",
  disabled = null,
  fullHeight = false,
  titleText = null,
  triggerBackgroundColor=null,
  onOpen = () => {},
  ...props
}) {
  const [showModal, setShowModal] = useState();

  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      handleClose()
    }
  }

  useEffect(() => {
    if (document) document?.addEventListener("keydown", closeOnEscape, false);

    return () => {
      if (document) document?.removeEventListener("keydown", closeOnEscape, false);
    };
  }, []);

  useEffect(() => {
    if (showModal === true) {
      onOpen();
    }
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleClick = async () => {
    setShowModal(true);
  };
  const triggerButtonClasses = `button${triggerBackgroundColor ? "-" + triggerBackgroundColor : "" }`
  return (
    <>
      <button
        className={triggerButtonClasses}
        disabled={disabled}
        onClick={handleClick}
      >
        {triggerText}
      </button>

      {showModal && (
        <div className="flex flex-col justify-start align-center modal" style={{height:"100vh"}}>
          {titleText && (
            <div className="modal-title-bar">
              <span className="modal-close-icon" onClick={handleClose}>
                <strong>X</strong>
              </span>
              <h2 className="text-center">{titleText}</h2>
            </div>
          )}
          <div className="modal-content mb-4">{props.children}</div>
          <div className="flex flex-row justify-center align-center modal-action-bar">
            <button className="button-error" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
