import React, { useState, useEffect } from 'react';
import '../App.css';
import Services from '../services/service';
import Start from './Start';
import Question from './Question';
import End from './End';
import Modal from './Modal';

let interval;
function Quiz() {

    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState(0);
    const [quizData, setQuizData] = useState([]);


    useEffect(() => {
        if (step === 3) {
            clearInterval(interval);
        }
    }, [step]);

    const quizStartHandler = () => {
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 1);
        }, 1000);
    }

    function renderLoader() {
        return <div className="loader offset-6"><span className="spinner-grow spinner-grow-lg text-success"></span></div>;
    }

    function renderError() {
        return (
            <>
                <div>
                    <div className="card alert alert-danger">
                        <div>
                            <div><strong>No User Info Found!!</strong> Navigate to HomeScreen to add user info</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function renderNoData() {
        return (
            <div className="card alert alert-danger alert-footer">
                <div>
                    <div><strong>Sorry No Results!!</strong></div>
                </div>
            </div>);
    }

    function getData(data) {
        if (data) {
            setQuizData(data);
            setStep(2);
        }
    }

    const resetQuiz = () => {
        const cnfm = window.confirm('Are you sure, want to reset the Quiz?');
        if (cnfm) setStep(1)
        else return;
    }

    function renderBody() {
        return (
            <>
                <div className="quiz-container container">
                    {/* Renders The Reset Quiz Button */}
                {step === 2 && <div className="reset-btn">
                    <button className="btn btn-success" onClick={resetQuiz}>Reset Quiz</button>
                </div>}
                    {step === 1 && <Start onQuizStart={quizStartHandler} getData={getData} />}
                    {step === 2 && <Question
                        quizData={quizData}
                        onSetStep={setStep}
                    />}
                    {step === 3 && <End
                        resetQuiz={setStep}
                    />}
                    {showModal && <Modal
                        onClose={() => setShowModal(false)}
                        results={answers}
                        data={quizData.data}
                    />}
                </div>
            </>
        )
    }

    // RETURN MAIN CONTENT IF USER INFO FOUND ELSE SHOW ERROR
    return (Services.checkUserCache() ? renderBody() : renderError());
}

export default Quiz;
