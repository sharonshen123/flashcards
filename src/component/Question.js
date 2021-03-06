import React, { useState, useEffect } from 'react';

const Question = ({ quizData, onSetStep }) => {
  const [selected, setSelected] = useState('');
  const [alert, setAlert] = useState('');
  const [newQuizData, setNewQuizData] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [submitted, setSubmitClicked] = useState(false);
  const [questionCount, setTotalQuestions] = useState(0);



  useEffect(() => {
    const choices = quizData?.map(choice => {
      if (choice.choices !== null) {
        const ch = choice?.choices.split(',')
        choice.choices = ch
      }
    });
    // const choices = quizData?.map(choice => {
    // const ch= choice?.choices.split(',');
    // //const ch = choice.choices.split(',');
    //   choice.choices = ch
    // });
    // assigning new choices array to quizData object
    console.log(quizData);
    setTotalQuestions(quizData.length);
    setNewQuizData(quizData);
  }, []);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (alert) {
      setAlert('');
    }
  }
  const checkAnswer = (selected) => {
    setSubmitClicked(true);
    if (selected === newQuizData[activeQuestion].word) {
      setIsCorrect(true);
      setAlert('Correct Answer');
    } else {
      setIsCorrect(false);
      setAlert('Incorrect Answer. Correct answer is');
    }
  };

  const submitClickHandler = (e) => {
    if (selected === '') {
      return setAlert('Please select one option!');
    }
    checkAnswer(selected);
    setSelected('');
  }

  const nextPage = (e) => {
    if (activeQuestion < newQuizData.length - 1) {
      setActiveQuestion(activeQuestion + 1);
      setAlert('');
      setSubmitClicked(false);
      setIsCorrect(null);
    }
    else {
      onSetStep(3);
    }
  }

  return (
    <>
      {newQuizData?.length > 0 ?
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="quiz-questions">
                <div className="total-questions">
                  <span>Questions: {activeQuestion + 1}/{questionCount}</span>
                </div>
                <div className="col">
                  <label dangerouslySetInnerHTML={{ __html: newQuizData[activeQuestion]?.question }}></label>
                </div>
                <div className="col">
                  {newQuizData[activeQuestion]?.choices?.length && newQuizData[activeQuestion]?.choices?.map((choice, idx) => (
                    <div className={`answer ${isCorrect ? 'correct_answer' : ''}`} key={choice}>
                      <label className="radio has-background-light">
                        <input type="radio" id={idx} name="answer" value={choice} onChange={changeHandler} disabled={submitted} />
                        <span dangerouslySetInnerHTML={{ __html: choice }}></span>
                      </label>
                    </div>
                  ))}
                </div>
                {alert && <div className={isCorrect ? 'alert-success' : 'alert-danger'}>
                  <span>{alert}</span>
                  {!isCorrect && <span><strong>{newQuizData[activeQuestion].word}</strong></span>}
                </div>}
                <button className="btn btn-success btn-sm" onClick={submitClickHandler} disabled={selected === ''}>Submit</button>
                <button className="btn btn-success btn-sm" onClick={nextPage} disabled={!submitted}>Next</button>
              </div>
            </div>
          </div>
        </div>
        : <div className="alert alert-danger">Sorry,No Quiz Data. Reset Prefrences</div>}
    </>
  );
}

export default Question;