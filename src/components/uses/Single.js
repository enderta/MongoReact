import React from 'react';
import {Button, Modal, ModalFooter} from "react-bootstrap";
import EditDelete from "./EditDelete";

function Single(props) {
    const {user} = props;
    const [modalShow, setModalShow] = React.useState(false);
    console.log(user)
    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleModalShow}>
                View
            </Button>
            <Modal show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{user.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>{user.name}</h1>
                    <h1>{user.email}</h1>
                    <h1>{user.department}</h1>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <EditDelete user={user} />
                </ModalFooter>
            </Modal>


        </div>
    );
}

export default Single;