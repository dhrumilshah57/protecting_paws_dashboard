import React, { useState } from "react";
import "./VideoModal.css";
import team3 from "assets/images/team-3.jpg";
import liveThumb from "assets/images/live.png";
// eslint-disable-next-line react/prop-types
const VideoModal = ({ videoBase64 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="video-modal">
      <button
        onClick={toggleModal}
        style={{ border: "none", background: "none", padding: "0", margin: "0" }}
      >
        <img src={liveThumb} width="210" height="170" style={{ padding: "10px" }} />
      </button>
      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              &times;
            </span>
            <video width="560" height="315" controls>
              <source src={videoBase64} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoModal;
