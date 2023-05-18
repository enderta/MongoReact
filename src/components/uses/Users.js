import React from 'react';
import {Button, Card, Modal, ModalFooter} from "react-bootstrap";
import Single from "./Single";
import EditDelete from "./EditDelete";
import AddUser from "./AddUser";
function Users() {
    const [users, setUsers] = React.useState([]);
    const [modalShow, setModalShow] = React.useState(false);


    React.useEffect(() => {
        fetch('http://localhost:5000/api/user')
            .then(res => res.json())
            .then(users => setUsers(users.users));
    }, []);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    console.log(users)
    return (
        <div>
            <h1>Users</h1>
            <AddUser>
                + Add User
            </AddUser>
          <div className={'container'}>
            <div className={'row'}>
                {users.map(user => (
                    <div className={'col-md-4'}>
                        <br/>
                        <Card key={user._id}>
                            <Card.Img variant="top" src={user.picture} />
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>{user.email}</Card.Text>
                            </Card.Body>
                           <Card.Footer>
                             <Single user={user} />

                            </Card.Footer>
                        </Card>
                    </div>
                ))}
            </div>
          </div>
        </div>
    );
}

export default Users;