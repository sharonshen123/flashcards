import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './flashcards/FlashcardList';
import '../App.css';
import Services from '../services/service';

function CardsPage() {
    const [flashcards, setFlashcards] = useState([])
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [isLoading, setLoader] = useState(true)

    const categoryEl = useRef();
    const bookEl = useRef();
    const wordEl = useRef();

    useEffect(() => {
        Services.getAllData()
            .then(res => {
                setLoader(false);
                console.log(res);
                const allCategories = [...new Set(res.data.map((item) => {
                    return item.category
                }))]

                const allBooks = [... new Set(res.data.map((item) => {
                    return item.book
                }))];
                setCategories(allCategories)
                setBooks(allBooks)
            })
    }, []);


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

    function renderNoData() {
        return (
            <div className="alert alert-warning alert-danger">
                <div>
                    <div><strong>Filter Category & Book, Start To Learn Writers' Word Choices!!</strong></div>
                </div>
            </div>);
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

    function renderBody() {
        return (
            isLoading ? renderLoader() :
                <div>
                    <form className="header" onSubmit={handleSubmit}>
                        <div className="col">
                            <span htmlFor="category"><strong>Category</strong></span>
                            <select id="category" ref={categoryEl}>
                                <option>All</option>
                                {categories.map((category, idx) => {
                                    const valid = idx > -1 && category !== null;
                                    return valid && <option key={idx}>{category}</option>
                                })}
                            </select>
                            <span htmlFor="word_count"><strong>Word Count</strong></span>
                            <input type="number" id="word_count" min="1" step="1" defaultValue={10} ref={wordEl} />
                        </div>
                        <div className="col">
                            <span htmlFor="book"><strong>Books</strong></span>
                            <select id="book" ref={bookEl}>
                                <option>All</option>
                                {books.map((book, idx) => {
                                    const valid = idx > -1 && book;
                                    return valid && <option key={idx}>{book}</option>
                                })}
                            </select>
                        </div>
                        <div className="col">
                            <button className="btn btn-success">Filter</button>
                        </div>
                    </form>
                    <div className="flashcard-container">
                        {flashcards.length > 0 ? <FlashcardList flashcards={flashcards} /> : renderNoData()}
                    </div>
                </div>)
    }

    // RETURN MAIN CONTENT IF USER INFO FOUND ELSE SHOW ERROR
    return (Services.checkUserCache() ? renderBody() : renderError());
}
export default CardsPage;
