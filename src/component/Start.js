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

  function renderLoader() {
    return <div className="loader offset-6"><span className="spinner-grow spinner-grow-lg text-success"></span></div>;
  }


  return (
    isLoading ? renderLoader() :
      <div className="card alert-success">
        <div className="card-content">
          <div className="content">
            <form className="quiz_header" onSubmit={handleSubmit}>
              <h1>Start the Quiz</h1>
              <hr></hr>
              <div className="col-6">
                <span htmlFor="category"><strong>Category&nbsp;</strong></span>
                <select id="category" ref={categoryEl}>
                  {categories.map(category => {
                    const valid = category.id && category.name;
                    return valid && <option key={category.id}>{category.name}</option>
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
                  {books.map(book => {
                    const valid = book.id && book.name;
                    return valid && <option key={book.id}>{book.name}</option>
                  })}
                </select>
              </div>
              <div className="quiz_label">
                <label>Good luck!</label>
              </div>
              <button className="btn btn-success btn-sm btn-generate">Start</button>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Start;