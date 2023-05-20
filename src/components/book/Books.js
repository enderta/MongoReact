import React, {useState} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import {Button} from "react-bootstrap";
function Books(props) {
const [books, setBooks] = useState([]);
const [check, setCheck] = useState(false);

const handleCheck = () => setCheck(!check);


    const client = new ApolloClient({
        uri: 'http://localhost:5000/graphql',
        cache: new InMemoryCache()
    });

    client
        .query({
            query: gql`
        query {
            books {
                name
                genre
                author {
                    name
                    }
                    
        }
    }
    `
        })
        .then(result => setBooks(result.data.books));


    return (
        <div>
            <h1>Reading List</h1>
            <div className={'container'}>
                <div className={'row'}>
                    {books.map(book => (
                        <div className={'col-md-4'}>
                            <br/>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{book.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{book.genre}</h6>
                                    <p className="card-text">{book.author.name}</p>
                                    {
                                        check ?
                                            //if true show this as read check
                                        <h1 onClick={handleCheck}>Not Read X </h1>
                                            :
                                            //if false show this as not read check
                                        <h1 onClick={handleCheck}>Read ✅ </h1>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Books;