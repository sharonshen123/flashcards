import React, { useState, useEffect, useRef } from 'react';

const Question = ({ quizData }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();
  const [newQuizData, setNewQuizData] = useState(null);

  useEffect(() => {
    const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [quizData]);

  useEffect(() => {
    const choices = quizData?.question.split(','); // Change this to quizData.choices.split(',') to get data from choices array.
    quizData.choices = choices;
    setNewQuizData(quizData);
  }, []);

  const changeHandler = (e) => {
    setSelected(e.target.value);
    if (error) {
      setError('');
    }
  }

  const nextClickHandler = (e) => {
    if (selected === '') {
      return setError('Please select one option!');
    }
    // onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
    // setSelected('');
    // if (activeQuestion < numberOfQuestions - 1) {
    //   onSetActiveQuestion(activeQuestion + 1);
    // } else {
    // onSetStep(3);
    // }
  }

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className=""><span dangerouslySetInnerHTML={{ __html: newQuizData?.question }}></span></h2>
          <div className="control" ref={radiosWrapper}>
            {newQuizData?.choices.map((choice, i) => (
              <label className="radio has-background-light" key={i}>
                <input type="radio" name="answer" value={choice} onChange={changeHandler} />
                <span dangerouslySetInnerHTML={{ __html: choice }}></span>
              </label>
            ))}
          </div>
          {error && <div className="alert-danger">{error}</div>}
          <button className="btn btn-sm btn-success" onClick={nextClickHandler}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Question;