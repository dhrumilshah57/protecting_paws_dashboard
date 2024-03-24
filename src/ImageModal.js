import React, { useState } from "react";
import "./ImageModal.css";

// eslint-disable-next-line react/prop-types
const ImageModal = ({ imageBase64 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="image-modal">
      <button
        onClick={toggleModal}
        style={{ border: "none", background: "none", padding: "0", margin: "0" }}
      >
        <img src={imageBase64} width="100" height="100" />
      </button>
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <img className="imgModal" src={imageBase64} alt="Modal Image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageModal;
