import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

function AddUser(props) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [department, setDepartment] = React.useState('');
    const [picture, setPicture] = React.useState('');
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCahnge = (e) => {
        const {name, value} = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'email') {
            setEmail(value);
        } else if (name === 'department') {
            setDepartment(value);
        } else if (name === 'picture') {
            setPicture(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            department,
            picture
        }
        fetch(`http://localhost:5000/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(user => {
                console.log(user);
                window.location.reload();
            })
    }

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                +
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" name="name" value={name} onChange={handleCahnge} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={handleCahnge} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Department</Form.Label>
                            <Form.Control type="text" placeholder="Enter department" name="department" value={department} onChange={handleCahnge} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control type="text" placeholder="Enter picture" name="picture" value={picture} onChange={handleCahnge} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
}

export default AddUser;