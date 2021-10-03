import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import Services from '../services/service';

import Start from './Start';
import Question from './Question';
import End from './End';
import Modal from './Modal';
import quizData from '../services/quiz.json';

let interval;
function Quiz()
{
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
                        sentence: item.sentence,
                        synonyms: item.synonyms
                    }
                }))
            });
    }
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if(step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  return (Services.checkUserCache() &&
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
      
    <div className="App">
      {step === 1 && <Start onQuizStart={quizStartHandler} />}
      {step === 2 && <Question 
        data={quizData.data[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={quizData.data.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
      />}
      {step === 3 && <End 
        results={answers}
        data={quizData.data}
        onReset={resetClickHandler}
        onAnswersCheck={() => setShowModal(true)}
        time={time}
      />}

      {showModal && <Modal 
        onClose={() => setShowModal(false)}
        results={answers}
        data={quizData.data}
      />}
    </div>
    </>
  );
}

export default Quiz;
