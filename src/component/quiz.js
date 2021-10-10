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
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [time, setTime] = useState(0);
    const [isLoading, setLoader] = useState(true)
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

    const resetClickHandler = () => {
        setActiveQuestion(0);
        setAnswers([]);
        setStep(2);
        setTime(0);
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
        console.log('Hey Parent', data);
        if (data) {
            setQuizData(data[0]);
            setStep(2);
        }
    }

    function renderBody() {
        return (
            // isLoading ? renderLoader() :
            <>
                <div className="quiz-container">
                    {step === 1 && <Start onQuizStart={quizStartHandler} getData={getData} />}
                    {step === 2 && <Question
                        quizData={quizData}
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
        )
    }

    // RETURN MAIN CONTENT IF USER INFO FOUND ELSE SHOW ERROR
    return (Services.checkUserCache() ? renderBody() : renderError());
}

export default Quiz;
