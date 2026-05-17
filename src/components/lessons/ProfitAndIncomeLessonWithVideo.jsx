import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import FinanceQuiz from "./FinanceQuiz";

const profitIncomeQuiz = [
  {
    question: "What is income?",
    options: [
      "Money you spend",
      "Money you earn from work or business",
      "Money you borrow",
      "Money your parents give you",
    ],
    correct: 1,
    explanation: "Income is any money you earn from work, jobs, or running a business!",
    hint: "Think about earning money.",
  },
  {
    question: "What is profit?",
    options: [
      "All the money you make",
      "The money left after paying for costs",
      "The money you spend",
      "Money in the bank",
    ],
    correct: 1,
    explanation: "Profit = Revenue - Costs. It's what you keep!",
    hint: "What's left after you pay for things?",
  },
  {
    question: "If you sell lemonade for $30 and spend $5 on supplies, what's your profit?",
    options: [
      "$5",
      "$30",
      "$25",
      "$35",
    ],
    correct: 2,
    explanation: "$30 (revenue) - $5 (costs) = $25 profit!",
    hint: "Subtract costs from revenue.",
  },
  {
    question: "Which is a good business idea for kids?",
    options: [
      "Selling someone else's items without permission",
      "Dog walking with parent permission",
      "Pretending to work",
      "Taking money from home",
    ],
    correct: 1,
    explanation: "Safe, honest business ideas with permission are the best!",
    hint: "Think about safe and legal ways.",
  },
  {
    question: "If a business makes $100 in revenue and costs are $40, what's the profit margin percentage?",
    options: [
      "40%",
      "60%",
      "100%",
      "20%",
    ],
    correct: 1,
    explanation: "($60 profit / $100 revenue) × 100 = 60% profit margin!",
    hint: "Profit divided by revenue times 100.",
  },
];

export default function ProfitAndIncomeLessonWithVideo() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "What is Income?",
      emoji: "💵",
      videoTitle: "Understanding Income",
      videoDuration: "2:30",
    },
    {
      title: "What is Profit?",
      emoji: "📈",
      videoTitle: "Profit Explained",
      videoDuration: "3:00",
    },
    {
      title: "Quiz Time!",
      emoji: "🧠",
      isQuiz: true,
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50 p-6">
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
            className="bg-purple-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {currentStepData.isQuiz ? (
            <FinanceQuiz quizData={profitIncomeQuiz} />
          ) : (
            <div className="space-y-6">
              <VideoPlayer
                videoId={`profit-${currentStep}`}
                title={currentStepData.videoTitle}
                duration={currentStepData.videoDuration}
              />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-3">📌 Key Takeaways:</h3>
                <ul className="space-y-2 text-lg">
                  {currentStep === 0 && (
                    <>
                      <li>✅ Income is money you earn</li>
                      <li>✅ Jobs, selling things, businesses all earn income</li>
                      <li>✅ More income = more opportunities</li>
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
                      <li>✅ Profit = Revenue - Costs</li>
                      <li>✅ Keep track of what you spend</li>
                      <li>✅ Profit is what you actually keep</li>
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
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
