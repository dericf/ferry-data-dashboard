import React, { useEffect, useState } from "react";
import { Button } from "./Button";

export default function InfoModal({
  triggerText = "View",
  disabled = null,
  fullHeight = false,
  titleText = null,
  triggerBackgroundColor = null,
  onOpen = () => {},
  ...props
}) {
  const [showModal, setShowModal] = useState();

  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    if (document) document?.addEventListener("keydown", closeOnEscape, false);

    return () => {
      if (document)
        document?.removeEventListener("keydown", closeOnEscape, false);
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
  
  return (
    <>
      <Button
        color="green"
        className="mt-2"
        disabled={disabled}
        onClick={handleClick}
      >
        {triggerText}
      </Button>

      {showModal && (
        <div
          className="fixed top-0 left-0 h-screen w-screen flex flex-col justify-start align-middle bg-white align-center z-40"
          style={{ height: "100vh" }}
        >
          {titleText && (
            <div className="bg-blue-500 text-white m-0 py-4 px-2">
              <svg
                className="w-4 h-4 hover:shadow-md cursor-pointer fixed right-4 top-4 z-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={handleClose}
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>

              <h2 className="text-4xl text-center">{titleText}</h2>
            </div>
          )}
          <div className="mb-4 mx-auto h-full w-full px-8 py-4 overflow-auto">{props.children}</div>
          <div className="flex flex-row justify-center align-center modal-action-bar px-8 py-4">
            <Button color="red" className="button-error" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
