import React, { useState, useEffect } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';

function Books(props) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const client = new ApolloClient({
        uri: 'http://localhost:5000/graphql',
        cache: new InMemoryCache()
    });

    const fetchBooks = () => {
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
            .then(result => {
                const booksWithCheck = result.data.books.map(book => ({
                    ...book,
                    check: false
                }));
                setBooks(booksWithCheck);
            });
    };

    const handleCheck = index => {
        setBooks(prevBooks => {
            const updatedBooks = [...prevBooks];
            updatedBooks[index] = {
                ...updatedBooks[index],
                check: !updatedBooks[index].check
            };
            return updatedBooks;
        });
    };

    return (
        <div>
            <h1>Reading List</h1>
            <div className={'container'}>
                <div className={'row'}>
                    {books.map((book, index) => (
                        <div className={'col-md-4'} key={index}>
                            <br />
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{book.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{book.genre}</h6>
                                    <p className="card-text">{book.author.name}</p>
                                    {book.check ? (
                                        <h6 className="card-subtitle mb-2 text-muted" onClick={() => handleCheck(index)}>
                                            Read ✅
                                        </h6>
                                    ) : (
                                        <h6 className="card-subtitle mb-2 text-muted" onClick={() => handleCheck(index)}>
                                            Not Read ❌
                                        </h6>
                                    )}
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
