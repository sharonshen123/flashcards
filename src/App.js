import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
      .get('http://localhost:5000/getData')
      .then(res => {
        const allCategories = res.data.map((item, index) => {
          return {
            id: index,
            name: item.category
          }
        })
        console.log(allCategories);
        setCategories(allCategories)
      })
  }, [])

  function handleSubmit(e) {
    console.log(e);
    e.preventDefault()
    axios
      .get('http://localhost:5000/getData')
      .then(res => {
        setFlashcards(res.data.map((item, index) => {
          return {
            id: `${index}-${Date.now()}`,
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
