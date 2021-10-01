import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from '../FlashcardList';
import '../App.css'
import Services from '../services/service'

function CardsPage() {
    const [flashcards, setFlashcards] = useState([])
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])

    const categoryEl = useRef()
    const bookEl = useRef()
    const wordEl = useRef()

    useEffect(() => {
        Services.getAllData()
            .then(res => {
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
                })
                setCategories(allCategories)
                setBooks(allBooks)
            })
    }, [])


    function handleSubmit(e) {
        e.preventDefault()
        const filterOptions = {
            "category": e.target[0].value,
            "book": e.target[1].value,
            "word_count": Number(e.target[2].value)
        }
        filterData(filterOptions)
    }

    function filterData(filterOptions) {
        Services.filterBy(filterOptions)
            .then(res => {
                setFlashcards(res.data.map((item, index) => {
                    return {
                        id: `${index}-${Date.now()}`,
                        pg: item.pg,
                        book: item.book,
                        definition: item.definition,
                        category: item.category,
                        word: item.word,
                        sentence: item.sentence
                    }
                }))
            });
    }

    return (
        <>
            <form className="header" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" ref={categoryEl}>
                        {categories.map(category => {
                            const valid = category.id && category.name;
                            return valid && <option key={category.id}>{category.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="book">Books</label>
                    <select id="book" ref={bookEl}>
                        {books.map(book => {
                            const valid = book.id && book.name;
                            return valid && <option key={book.id}>{book.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="word_count">Number of Words</label>
                    <input type="number" id="word_count" min="1" step="1" defaultValue={10} ref={wordEl} />
                </div>
                <div className="form-group">
                    <button className="btn">Generate</button>
                </div>
            </form>
            <div className="container">
                <FlashcardList flashcards={flashcards} />
            </div>
        </>
    );
}
export default CardsPage;
