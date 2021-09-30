import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()
  const bookEl = useRef()

  useEffect(() => {
    axios
      .get('http://sharon.bdxonline.com:5000/getData')
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
        console.log(allCategories);
        setCategories(allCategories)
        console.log(allBooks);
        setBooks(allBooks)
      })
  }, [])

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault()
    axios
      .get('http://sharon.bdxonline.com:5000/filterBy', {
        params: {
          
          category: categoryEl.current.value
        }
      })
      .then(res => {
        setFlashcards(res.data.map((item, index) => {
          return {
            id: `${index}-${Date.now()}`,
            book: item.book,
            pg: item.pg,
            definition: item.definition,
            category: item.category,
            word: item.word,
            sentence: item.sentence,
            synonyms: item.synonyms
          }
        }))
      });
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="book">Book</label>
          <select id="book" ref={bookEl}>
            {books.map(book => {
              const valid1 = book.id && book.name;
              return valid1 && <option value={book.id} key={book.id}>{book.name}</option>
            })}
            <option value={50} key={50}>TKMB</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              const valid = category.id && category.name;
              return valid && <option value={category.id} key={category.id}>{category.name}</option>
            })}
            <option value={50} key={50}>Adj</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Words</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
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
export default App;
