import {React,useState,useEffect} from 'react';



function ReadingList(props) {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const fetchBooks = () => {
        setLoading(true);
        fetch(`http://localhost:5000/books?search=${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                setBooks(data.data);
                setLoading(false);
            });

    }
    console.log(books)
    useEffect(() => {
        fetchBooks();

    }, [searchTerm]);

    const handleSearch = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    }
    const handleCheck = (index) => {
        fetch(`http://localhost:5000/books/${books[index].id}`, {
            method:"PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: books[index].title,
                author: books[index].author,
                image_url: books[index].image_url,
                is_read: !books[index].is_read
            }
            )
        })
            .then(res => res.json())
            .then(data => {
                fetchBooks();
               // window.location.reload();
            }
            );
    }
    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <div>
            {
                loading ? <h1>Loading...</h1> :
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h1>Reading List</h1>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"
                                           value={searchTerm}
                                           onChange={handleSearch} />
                                    <div className={'row'}>
                                        {books.map((book, index) => (
                                            <div className={'col-md-4'} key={index}>
                                                <br />
                                                <div className="card">
                                                    <div className="card-body">
                                                        //image
                                                        <img src={book.image_url} alt={book.title} />
                                                        <h5 className="card-title">{book.title}</h5>
                                                        <p className="card-text">{book.author}</p>
                                                        {book.is_read ? (
                                                            <h6 className="card-subtitle mb-2 text-muted" onClick={() => handleCheck(index)}>
                                                                Read: ✅
                                                            </h6>
                                                        ) : (
                                                            <h6 className="card-subtitle mb-2 text-muted" onClick={() => handleCheck(index)}>
                                                                Read: ❌
                                                            </h6>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default ReadingList;