import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './flashcards/FlashcardList';
import '../App.css';
import Services from '../services/service';

function CardsPage() {
    const [flashcards, setFlashcards] = useState([])
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [isLoading, setLoader] = useState(true)

    const categoryEl = useRef()
    const bookEl = useRef()
    const wordEl = useRef()

    useEffect(() => {
        Services.getAllData()
            .then(res => {
                setLoader(false);
                const allCategories = res.data.map((item, index) => {
                    return {
                        id: index,
                        name: item.category
                    }
                })
                const allBooks = res.data.map((item, index) => {
                    return {
                        id: index,
                        name: item.book
                    }
                });
                setCategories(allCategories)
                setBooks(allBooks)
            })
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        const filterOptions = {
            "category": e.target[0].value,
            "book": e.target[2].value,
            "word_count": Number(e.target[1].value)
        }
        filterData(filterOptions)
    }

    function filterData(filterOptions) {
        Services.filterBy(filterOptions)
            .then(res => {
                setLoader(false);
                setFlashcards(res.data.map((item, index) => {
                    return {
                        id: `${index}-${Date.now()}`,
                        pg: item.pg,
                        book: item.book,
                        definition: item.definition,
                        category: item.category,
                        word: item.word,
                        sentence: item.sentence,
                        synonyms: item.synonyms
                    }
                }))
            });
    }

    function renderLoader() {

        return <div className="loader offset-6"><span className="spinner-grow spinner-grow-lg text-success"></span></div>;
    }

    function renderBody() {
        return (
            isLoading ? renderLoader() :
                <>
                    <form className="header" onSubmit={handleSubmit}>
                        <div className="col">
                            <div className="">
                                <span htmlFor="category">Category</span>
                                <select id="category" ref={categoryEl}>
                                    {categories.map(category => {
                                        const valid = category.id && category.name;
                                        return valid && <option key={category.id}>{category.name}</option>
                                    })}
                                </select>
                            </div>
                            <div className="col">
                                {/* <label htmlFor="word_count">No: of Words</label> */}
                                <input type="number" id="word_count" min="1" step="1" defaultValue={10} ref={wordEl} />
                            </div>
                        </div>
                        <div className="col">
                            <label htmlFor="book">Books</label>
                            <select id="book" ref={bookEl}>
                                {books.map(book => {
                                    const valid = book.id && book.name;
                                    return valid && <option key={book.id}>{book.name}</option>
                                })}
                            </select>
                        </div>
                        <div className="col">
                            <button className="btn btn-success">Filter</button>
                        </div>
                    </form>
                    <div className="flashcard-container">
                        <FlashcardList flashcards={flashcards} />
                    </div>
                </>)
    }

    function renderError() {
        return (
            <>
                <div>
                    <div className="card alert alert-danger">
                        <div>
                            <div><strong>No User Info Found!!</strong> Navigate to HomeScreen to add user info</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // RETURN MAIN CONTENT IF USER INFO FOUND ELSE SHOW ERROR
    return (Services.checkUserCache() ? renderBody() : renderError());
}
export default CardsPage;
