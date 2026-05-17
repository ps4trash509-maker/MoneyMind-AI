import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import FinanceQuiz from "./FinanceQuiz";

const savingMoneyQuiz = [
  {
    question: "What is the main reason to save money?",
    options: [
      "To buy things you really want",
      "To waste it later",
      "Because it's boring",
      "To hide it from friends",
    ],
    correct: 0,
    explanation: "Saving helps you reach your goals and buy things you truly want!",
    hint: "Think about your goals and dreams.",
  },
  {
    question: "If you save $10 every week, how much will you save in 4 weeks?",
    options: [
      "$10",
      "$20",
      "$40",
      "$50",
    ],
    correct: 2,
    explanation: "$10 × 4 weeks = $40. Consistency builds wealth!",
    hint: "Multiply $10 by 4.",
  },
  {
    question: "Which is a good savings goal?",
    options: [
      "Save money without a plan",
      "Save $50 for a video game by next month",
      "Save everything and never spend",
      "Save only when you remember",
    ],
    correct: 1,
    explanation: "Specific, measurable goals keep you motivated!",
    hint: "Good goals are clear and have a deadline.",
  },
  {
    question: "Where should you keep your savings?",
    options: [
      "Under your pillow",
      "In your backpack",
      "A safe place like a piggy bank or savings account",
      "Mixed with your spending money",
    ],
    correct: 2,
    explanation: "Keep savings in a safe place where you won't accidentally spend it!",
    hint: "Think about safety and not spending it accidentally.",
  },
  {
    question: "What is compound savings?",
    options: [
      "Saving once a year",
      "Saving small amounts regularly that add up over time",
      "Not saving at all",
      "Losing your money",
    ],
    correct: 1,
    explanation: "Saving consistently means your money grows steadily!",
    hint: "Think about how small amounts add up.",
  },
];

export default function SavingMoneyLessonWithVideo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizResults, setQuizResults] = useState(null);

  const steps = [
    {
      title: "Why Save Money?",
      emoji: "💰",
      videoTitle: "The Power of Saving",
      videoDuration: "2:45",
    },
    {
      title: "Compound Savings",
      emoji: "📈",
      videoTitle: "How Your Savings Grow",
      videoDuration: "2:15",
    },
    {
      title: "Quiz Time!",
      emoji: "🧠",
      isQuiz: true,
    },
  ];

  const handleVideoComplete = () => {
    console.log("Video completed!");
  };

  const handleQuizComplete = (score, total, answers) => {
    setQuizResults({ score, total, answers });
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6">
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
            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {currentStepData.isQuiz ? (
            <FinanceQuiz quizData={savingMoneyQuiz} onComplete={handleQuizComplete} />
          ) : (
            <div className="space-y-6">
              <VideoPlayer
                videoId={`saving-${currentStep}`}
                title={currentStepData.videoTitle}
                duration={currentStepData.videoDuration}
                onComplete={handleVideoComplete}
              />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-3">📌 Key Takeaways:</h3>
                <ul className="space-y-2 text-lg">
                  {currentStep === 0 && (
                    <>
                      <li>✅ Saving helps you reach your goals</li>
                      <li>✅ Start small, be consistent</li>
                      <li>✅ Every dollar counts</li>
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
                      <li>✅ Small amounts add up quickly</li>
                      <li>✅ $5/week = $260/year</li>
                      <li>✅ The earlier you start, the more you save</li>
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
            className="px-6 py-3 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
