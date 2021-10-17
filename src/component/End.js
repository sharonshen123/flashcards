import React, { useState } from 'react';
import Services from '../services/service';

const End = ({ resetQuiz }) => {

  const tryAgain = () => {
    resetQuiz(1);
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h3>Good Job! {Services.getUserName()}</h3>
            <hr />
            <div className="reset-btn">
              <button className="btn btn-success" onClick={tryAgain}>Try Another Quiz</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default End;