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
<<<<<<< HEAD
    .get('https://protected-temple-56132.herokuapp.com/getData')
    .then(res => {
      
    }
      )
    /*.get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res => {
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })*/

    
    
    
    /*setFlashcards(getCards().results.map((questionItem, index) => {
        const answer = decodeString(questionItem.correct_answer)
        const options = [
          ...questionItem.incorrect_answers.map(a => decodeString(a)),
          answer
        ]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }

    }))*/
    
=======
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
>>>>>>> e45d47c4dd3ce2d6e7879bebf9a0ef611eae91d8
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
<<<<<<< HEAD
const ISLT = [
  {
    id: 50,
    question: 'serpentine',
    answer: 'sinuous',
    options: [
      "On a <b>serpentine</b> road, with grand arias"
    ]
  },
  {
    id: 51,
    question: 'thrall',
    answer: 'the state of being in someones power or having great power over someone',
    options: [
      "while I'm was asleep I had returned without the least effort to an earlier stage in my life, now for ever outgrown; and had come under the <b>thrall</b> of one of my childish terrors, such as that old terror of my great-uncles pulling my curls, which was effectually dispelled on the day—the dawn of a new era to me-on which they were finally cropped from my head. "
    ]
  }
]
=======
>>>>>>> e45d47c4dd3ce2d6e7879bebf9a0ef611eae91d8
export default App;
