import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './App.css'
import axios from 'axios'

function App() {
  const [flashcards, setFlashcards] = useState(ISLT)
  const [categories, setCategories] = useState([])

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
      .get('https://opentdb.com/api_category.php')
      .then(res => {
        setCategories(res.data.trivia_categories)
      })
  }, [])

  useEffect(() => {

  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = str
    return textArea.value
  }
  // function getCards(){
  //   const sampleCards =  {"results":[{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What is the profession of Elon Musk&#039;s mom, Maye Musk?","correct_answer":"Model","incorrect_answers":["Professor","Biologist","Musician"]}]}
  //   return sampleCards
  // }
  function handleSubmit(e) {

    e.preventDefault()
    axios
      .get('https://opentdb.com/api.php', {
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
      })




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

  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
            <option value={50} key={50}>Adj</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
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
const name = { question: 'sinuous' };
const ISLT = [
  {
    id: 50,
    question: 'serpentine',
    answer: 'sinuous',
    options: [
      "On a <b>serpentine</b> question, with grand arias"
    ]
  },
  {
    id: 51,
    question: 'thrall',
    answer: 'the state of being in someones power or having great power over someone',
    options: [
      "While I'm was asleep I had returned without the least effort to an earlier stage in my life, now for ever outgrown; and had come under the <b>thrall</b> of one of my childish terrors, such as that old terror of my great-uncles pulling my curls, which was effectually dispelled on the day—the dawn of a new era to me-on which they were finally cropped from my head."
    ]
  }
]
export default App;
