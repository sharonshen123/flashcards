import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div className="flip-card">
      <div
        className={`card ${flip ? 'flip' : ''}`}
        style={{ height: height }}
        onClick={() => setFlip(!flip)}
      >
        <div className="front" ref={frontEl}>
          <strong>{flashcard.word}</strong>
          <hr></hr>
          <div class="back-text">
            <span dangerouslySetInnerHTML={{ __html: flashcard.sentence }}></span>
          </div>
        </div>
        <div className="back" ref={backEl}>
          <div className="back-label">
          <div className="flashcard-options">
            <div className="flashcard-option" key={flashcard.word}><b>Definition:</b> <span dangerouslySetInnerHTML={{ __html: flashcard.definition }}></span></div>
          </div>
          <hr></hr>
          <div className="flashcard-options">
            <div className="flashcard-option" key={flashcard.synonyms}><b>Synonyms:</b> <span dangerouslySetInnerHTML={{ __html: flashcard.synonyms }}></span></div>
          </div>
          </div>
          
          
        </div>
      </div>
    </div >
  )
}