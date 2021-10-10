import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import Services from '../services/service';


const Start = ({ onQuizStart, getData }) => {
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
    onQuizStart();
  }

  function filterData(filterOptions) {
    Services.filterForQuiz(filterOptions)
      .then(res => {
        setLoader(false);
        getData(res?.data);
      });
  }


  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <form className="quiz_header" onSubmit={handleSubmit}>
            <span htmlFor="category"><strong>Category&nbsp;</strong></span>
            <select id="category" ref={categoryEl}>
              {categories.map(category => {
                const valid = category.id && category.name;
                return valid && <option key={category.id}>{category.name}</option>
              })}
            </select>
            <span htmlFor="word_count"><strong>Count&nbsp;</strong></span>
            <input type="number" id="word_count" min="1" step="1" defaultValue={10} ref={wordEl} />
            <span htmlFor="book"><strong>Books&nbsp;</strong></span>
            <select id="book" ref={bookEl}>
              {books.map(book => {
                const valid = book.id && book.name;
                return valid && <option key={book.id}>{book.name}</option>
              })}
            </select>
            <h1>Start the quiz</h1>
            <p>Good luck!</p>
            <button className="btn btn-success btn-sm btn-generate">Start</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Start;