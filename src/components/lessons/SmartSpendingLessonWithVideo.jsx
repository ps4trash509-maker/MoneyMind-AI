import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import FinanceQuiz from "./FinanceQuiz";

const smartSpendingQuiz = [
  {
    question: "What is a NEED?",
    options: [
      "Something you want but don't need",
      "Something you must have to survive",
      "Something expensive",
      "Something fun to buy",
    ],
    correct: 1,
    explanation: "Needs are things you must have like food, shelter, and clothes!",
    hint: "Think about survival basics.",
  },
  {
    question: "What is a WANT?",
    options: [
      "Something you need to survive",
      "Something you'd like to have but can live without",
      "Something expensive only",
      "Something your parents need",
    ],
    correct: 1,
    explanation: "Wants are things you'd like but don't need to survive like games or toys!",
    hint: "Think about fun things.",
  },
  {
    question: "Which is a NEED?",
    options: [
      "Video game",
      "Movie ticket",
      "School supplies",
      "Candy",
    ],
    correct: 2,
    explanation: "School supplies are necessary for learning! The others are wants.",
    hint: "What do you need for school?",
  },
  {
    question: "You have $20. You need $10 for school supplies and want a $15 toy. What should you do?",
    options: [
      "Buy the toy and skip supplies",
      "Buy the supplies first, then decide if you can afford the toy",
      "Buy nothing",
      "Ask for more money",
    ],
    correct: 1,
    explanation: "Always buy needs first! Then use leftover money for wants.",
    hint: "Needs come before wants.",
  },
  {
    question: "What's a smart budgeting rule?",
    options: [
      "Spend all your money immediately",
      "Plan what to buy before spending",
      "Never save money",
      "Buy whatever you want",
    ],
    correct: 1,
    explanation: "Planning helps you make smart choices and avoid overspending!",
    hint: "Think about planning ahead.",
  },
];

export default function SmartSpendingLessonWithVideo() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Wants vs Needs",
      emoji: "🛒",
      videoTitle: "Understanding Wants and Needs",
      videoDuration: "2:50",
    },
    {
      title: "Smart Spending",
      emoji: "💳",
      videoTitle: "How to Spend Wisely",
      videoDuration: "2:40",
    },
    {
      title: "Quiz Time!",
      emoji: "🧠",
      isQuiz: true,
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{currentStepData.emoji}</div>
          <h1 className="text-4xl font-bold mb-2">{currentStepData.title}</h1>
          <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-3 mb-8">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {currentStepData.isQuiz ? (
            <FinanceQuiz quizData={smartSpendingQuiz} />
          ) : (
            <div className="space-y-6">
              <VideoPlayer
                videoId={`spending-${currentStep}`}
                title={currentStepData.videoTitle}
                duration={currentStepData.videoDuration}
              />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-3">📌 Key Takeaways:</h3>
                <ul className="space-y-2 text-lg">
                  {currentStep === 0 && (
                    <>
                      <li>✅ Needs: Food, shelter, clothes, school</li>
                      <li>✅ Wants: Games, toys, candy, movies</li>
                      <li>✅ Buy needs FIRST</li>
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
                      <li>✅ Plan before spending</li>
                      <li>✅ Compare prices</li>
                      <li>✅ Wait before buying wants</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-400 text-white font-bold rounded-2xl hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Previous
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
