import React, { Component, useState } from 'react'
import './Quiz.css'
import QuizCore from '../core/QuizCore';

interface QuizState {
  selectedAnswer: string | null
  quizCore: QuizCore
}

const Quiz: React.FC = () => {

  const [state, setState] = useState<QuizState>({
    selectedAnswer: null,  // Initialize the selected answer.
    quizCore: new QuizCore()
  });

  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
  }


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    if (state.selectedAnswer) {
      quizCore.answerQuestion(state.selectedAnswer);
      quizCore.nextQuestion();
      setState((prevState) => ({ ...prevState, selectedAnswer: null }));
    }
  }

  const { quizCore, selectedAnswer } = state;
  const currentQuestion = quizCore.getCurrentQuestion();

  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.getNumQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      {(quizCore.hasNextQuestion()) ? (
        <button onClick={handleButtonClick}>Next Question</button>
      ) : (
        <button onClick={handleButtonClick}>Submit</button>
      )}
    </div>
  );
};

export default Quiz;