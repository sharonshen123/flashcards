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
        const allCategories = [...new Set(res.data.map((item) => {
          return item.category
        }))]

        const allBooks = [... new Set(res.data.map((item) => {
          return item.book
        }))];
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

  function renderLoader() {
    return <div className="loader offset-6"><span className="spinner-grow spinner-grow-lg text-success"></span></div>;
  }


  return (
    isLoading ? renderLoader() :
      <div className="quiz_start alert alert-success">
        <div className="card-content">
          <div className="content">
            <form className="quiz_header" onSubmit={handleSubmit}>
              <h1>Start the Quiz</h1>
              <hr></hr>
              <div className="col" style={{ textAlign: 'left' }}>
                <span htmlFor="category"><strong>Category&nbsp;</strong></span>
                <select id="category" ref={categoryEl}>
                  {categories.map((category, idx) => {
                    const valid = idx > -1 && category !== null;
                    return valid && <option key={idx}>{category}</option>
                  })}
                </select>
              </div>
              <div className="col">
                <span htmlFor="word_count"><strong>Count&nbsp;</strong></span>
                <input type="number" id="word_count" min="1" step="1" defaultValue={10} ref={wordEl} />
              </div>
              <div className="col">
                <span htmlFor="book"><strong>Books&nbsp;</strong></span>
                <select id="book" ref={bookEl}>
                  {books.map((book, idx) => {
                    const valid = idx > -1 && book;
                    return valid && <option key={idx}>{book}</option>
                  })}
                </select>
              </div>
              <div className="quiz_label">
                <label>Good luck {Services.getUserName()}!</label>
              </div>
              <button className="btn btn-success btn-sm btn-generate">Start</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Start;