import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";

function EditDelete(props) {
    const {user} = props;
    const [name, setName] = React.useState(user.name);
    const [email, setEmail] = React.useState(user.email);
    const [department, setDepartment] = React.useState(user.department);
    const[show, setShow] = React.useState(false);

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
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            department
        }
        fetch(`http://localhost:5000/api/user/${user._id}`, {
            method: 'PUT',
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

    const handleDelete = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/user/${user._id}`, {
            method: 'DELETE'
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
                Edit
            </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name={'name'} value={name} onChange={handleCahnge} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name={'email'} value={email} onChange={handleCahnge} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="text" name={'department'} value={department} onChange={handleCahnge} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Form>
            </Modal.Body>
            </Modal>
        </div>


    );
}

export default EditDelete;