import React, { useState, useEffect } from 'react';

const Question = ({ quizData, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const [alert, setAlert] = useState('');
  // const radiosWrapper = useRef();
  const [newQuizData, setNewQuizData] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [results, setResults] = useState([]);



  useEffect(() => {
    const choices = quizData?.map(choice => {
      const ch = choice.choices.split(',');
      choice.choices = ch
    });
    // assigning new choices array to quizData object
    console.log(quizData);
    setNewQuizData(quizData);
  }, []);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (alert) {
      setAlert('');
    }
  }
  const checkAnswer = (selected) => {
    if (selected === newQuizData[activeQuestion].word) {
      setIsCorrect(true);
      setAlert('Correct Answer is ');
    } else {
      setIsCorrect(false);
      setAlert('Incorrect Answer');
    }
  };

  const nextClickHandler = (e) => {
    if (selected === '') {
      return setAlert('Please select one option!');
    }
    checkAnswer(selected);
    setSelected('');
  }
  const nextPage = (e) => {
    if (activeQuestion < newQuizData.length - 1 && isCorrect) {
      setActiveQuestion(activeQuestion + 1);
      setAlert('');
      setIsCorrect(null);
    }
    else {
      onSetStep(3);
    }
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          {newQuizData &&
            <div className="">
              <label dangerouslySetInnerHTML={{ __html: newQuizData[activeQuestion]?.question }}></label>
              <div className="control">
                {newQuizData[activeQuestion]?.choices?.length && newQuizData[activeQuestion]?.choices?.map((choice, idx) => (
                  <div className={`answer ${isCorrect ? 'correct_answer' : ''}`} key={choice}>
                    <label className="radio has-background-light">
                      <input type="radio" id={idx} name="answer" value={choice} onChange={changeHandler} />
                      <span dangerouslySetInnerHTML={{ __html: choice }}></span>
                    </label>
                  </div>
                ))}
              </div>
              {alert && <div className={isCorrect ? 'alert-success' : 'alert-danger'}>
                <span>{alert}</span>
                {isCorrect && <span><strong>{newQuizData[activeQuestion].word}</strong></span>}
              </div>}
              <button className="btn btn-success" onClick={nextClickHandler} disabled={selected === ''}>Save</button>
              <button className="btn btn-success" onClick={nextPage} disabled={[null, false].includes(isCorrect)}>Next</button>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default Question;