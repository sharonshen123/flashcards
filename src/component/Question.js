import React, { useState, useEffect, useRef } from 'react';

const Question = ({ quizData }) => {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const radiosWrapper = useRef();

  // useEffect(() => {
  //   const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
  //   if (findCheckedInput) {
  //     findCheckedInput.checked = false;
  //   }
  // }, [data]);

  // const changeHandler = (e) => {
  //   setSelected(e.target.value);
  //   if (error) {
  //     setError('');
  //   }
  // }

  // const nextClickHandler = (e) => {
  //   if (selected === '') {
  //     return setError('Please select one option!');
  //   }
  //   onAnswerUpdate(prevState => [...prevState, { q: data.question, a: selected }]);
  //   setSelected('');
  //   if (activeQuestion < numberOfQuestions - 1) {
  //     onSetActiveQuestion(activeQuestion + 1);
  //   } else {
  //     onSetStep(3);
  //   }
  // }

  // return (
  //   <div className="card">
  //     <div className="card-content">
  //       <div className="content">
  //         <h2 className=""><span dangerouslySetInnerHTML={{ __html: data.question }}></span></h2>
  //         <div className="control" ref={radiosWrapper}>
  //           {data.choices.map((choice, i) => (
  //             <label className="radio has-background-light" key={i}>
  //               <input type="radio" name="answer" value={choice} onChange={changeHandler} />
  //               <span dangerouslySetInnerHTML={{ __html: choice }}></span>
  //             </label>
  //           ))}
  //         </div>
  //         {error && <div className="has-text-danger">{error}</div>}
  //         <button className="btn btn-primary" onClick={nextClickHandler}>Next</button>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div>Hey Question</div>
  )
}

export default Question;