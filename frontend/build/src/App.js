import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Fetch trivia questions from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/trivia')
      .then(response => {
        setQuestions(response.data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trivia questions:', error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (selectedAnswer) => {
    // Check if the selected answer is correct
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, selectedAnswer]);

    // Move to the next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (quizCompleted) {
    return (
      <div className="result">
        <h2>Quiz Completed!</h2>
        <p>Your score: {score} / {questions.length}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
  // Shuffle the answers
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="App">
      <h1>General Knowledge Quiz</h1>
      <div className="question">
        <h2>{currentQuestion.question}</h2>
        <ul>
          {shuffledAnswers.map((answer, index) => (
            <li key={index} onClick={() => handleAnswer(answer)}>
              {answer}
            </li>
          ))}
        </ul>
      </div>
      <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
    </div>
  );
};

export default App;

