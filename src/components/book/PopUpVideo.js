import React, { useState } from 'react';
import {Modal} from "react-bootstrap";

function YouTubeModal() {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>YouTube Video Popup</h1>
            <button onClick={handleOpenModal}>Open YouTube Video</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
                        <Modal className={'modal-dialog modal-lg'} show={showModal} onHide={handleCloseModal}>

                            <Modal.Body>
                                <iframe
                                    width="100%"
                                    height="315"
                                    src="https://www.youtube.com/embed/7sDY4m8KNLc"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded youtube"
                                />
                            </Modal.Body>
                        </Modal>

                    </div>
                </div>
            )}
        </div>
    );
}

export default YouTubeModal;
