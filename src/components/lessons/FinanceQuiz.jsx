import React, { useState } from "react";

export default function FinanceQuiz({ quizData, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState([]);

  const question = quizData[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  const handleSelectAnswer = (index) => {
    if (!showResult) {
      setSelectedAnswer(index);
      setShowResult(true);
    }
  };

  const handleNext = () => {
    const newAnswers = [
      ...answers,
      {
        question: question.question,
        userAnswer: question.options[selectedAnswer],
        correctAnswer: question.options[question.correct],
        isCorrect,
      },
    ];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      onComplete && onComplete(score + (isCorrect ? 1 : 0), quizData.length, newAnswers);
    }
  };

  if (quizComplete) {
    const finalScore = score + (answers[answers.length - 1]?.isCorrect ? 1 : 0);
    const percentage = Math.round((finalScore / quizData.length) * 100);
    const isPassed = percentage >= 70;

    return (
      <div className="bg-gradient-to-b from-purple-50 to-blue-50 rounded-3xl p-8 text-center">
        <div className="text-7xl mb-4">
          {isPassed ? "🎉" : "💪"}
        </div>
        <h2 className="text-4xl font-bold mb-4">
          {isPassed ? "Awesome Job!" : "Good Try!"}
        </h2>
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <p className="text-gray-600 mb-2">Your Score:</p>
          <p className="text-5xl font-bold text-purple-600">
            {finalScore}/{quizData.length}
          </p>
          <p className="text-2xl font-bold text-purple-500 mt-2">{percentage}%</p>
        </div>

        {isPassed && (
          <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-4 mb-6">
            <p className="text-green-700 text-lg font-bold">
              ✅ You passed! Great understanding of financial concepts!
            </p>
          </div>
        )}

        {!isPassed && (
          <div className="bg-yellow-100 border-2 border-yellow-500 rounded-2xl p-4 mb-6">
            <p className="text-yellow-700 text-lg font-bold">
              Keep studying! Try the quiz again to improve your score.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4 text-left">Review Your Answers:</h3>
          <div className="space-y-3 text-left max-h-80 overflow-y-auto">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  answer.isCorrect
                    ? "bg-green-50 border-green-400"
                    : "bg-red-50 border-red-400"
                }`}
              >
                <p className="font-bold text-gray-800 mb-2">
                  Q{index + 1}: {answer.question}
                </p>
                <p className="text-gray-700 mb-1">
                  Your answer: <span className={answer.isCorrect ? "text-green-600" : "text-red-600"}>{answer.userAnswer}</span>
                </p>
                {!answer.isCorrect && (
                  <p className="text-gray-700">
                    Correct answer: <span className="text-green-600 font-bold">{answer.correctAnswer}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="px-8 py-4 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 transition text-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-3xl p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-gray-600 font-semibold">
            Question {currentQuestion + 1} of {quizData.length}
          </p>
          <p className="text-purple-600 font-bold">{score} correct</p>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {question.question}
        </h2>
        {question.hint && (
          <p className="text-gray-600 italic text-lg">💡 Hint: {question.hint}</p>
        )}
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {question.options.map((option, index) => {
          let buttonClass = "bg-white border-2 border-gray-300 hover:border-purple-400";

          if (showResult) {
            if (index === question.correct) {
              buttonClass = "bg-green-100 border-2 border-green-500";
            } else if (index === selectedAnswer && !isCorrect) {
              buttonClass = "bg-red-100 border-2 border-red-500";
            }
          } else if (index === selectedAnswer) {
            buttonClass = "bg-purple-100 border-2 border-purple-500";
          }

          return (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={showResult}
              className={`p-4 rounded-2xl font-bold text-lg transition ${
                showResult ? "cursor-not-allowed" : "cursor-pointer hover:shadow-lg"
              } ${buttonClass}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {index === question.correct && showResult && "✅"}
                  {index === selectedAnswer && !isCorrect && showResult && "❌"}
                  {index !== question.correct && index !== selectedAnswer && ""}
                </span>
                <span className="text-left">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Result Message */}
      {showResult && (
        <div
          className={`p-6 rounded-2xl mb-6 text-lg font-bold ${
            isCorrect
              ? "bg-green-100 border-2 border-green-500 text-green-700"
              : "bg-red-100 border-2 border-red-500 text-red-700"
          }`}
        >
          {isCorrect ? "🎉 Correct! " : "❌ Incorrect. "}
          {question.explanation}
        </div>
      )}

      {/* Next Button */}
      {showResult && (
        <button
          onClick={handleNext}
          className="w-full py-4 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 transition text-lg"
        >
          {currentQuestion === quizData.length - 1 ? "See Results" : "Next Question"}
        </button>
      )}
    </div>
  );
}
