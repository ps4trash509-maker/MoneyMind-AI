import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import FinanceQuiz from "./FinanceQuiz";

const miniBizQuiz = [
  {
    question: "What's important before starting a business?",
    options: [
      "Just start without planning",
      "Get parent permission and plan ahead",
      "Steal supplies",
      "Copy someone else's idea exactly",
    ],
    correct: 1,
    explanation: "Always get parent permission and have a plan!",
    hint: "Think about responsibility.",
  },
  {
    question: "Which business has the lowest startup cost?",
    options: [
      "Dog walking",
      "Lemonade stand",
      "Car washing",
      "Cookie selling",
    ],
    correct: 0,
    explanation: "Dog walking needs no supplies! You just need time and effort.",
    hint: "What needs nothing to buy?",
  },
  {
    question: "How do you know your business is successful?",
    options: [
      "You make money once",
      "You have regular customers and positive feedback",
      "You spend lots of money",
      "You work for free",
    ],
    correct: 1,
    explanation: "Regular customers and good reputation mean success!",
    hint: "Think about long-term success.",
  },
  {
    question: "What should you do if your business isn't making money?",
    options: [
      "Give up immediately",
      "Analyze what's wrong and improve",
      "Blame others",
      "Raise prices without reason",
    ],
    correct: 1,
    explanation: "Learning and improving is part of business!",
    hint: "What do successful people do?",
  },
  {
    question: "Which is NOT important for a kid's business?",
    options: [
      "Honesty and hard work",
      "Taking care of customers",
      "Breaking the law",
      "Keeping records",
    ],
    correct: 2,
    explanation: "Always follow the law! Honesty is the best policy.",
    hint: "What would be wrong?",
  },
];

export default function MiniBizIdeasLessonWithVideo() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Business Ideas",
      emoji: "🚀",
      videoTitle: "6 Businesses Kids Can Start",
      videoDuration: "4:15",
    },
    {
      title: "Success Tips",
      emoji: "⭐",
      videoTitle: "How to Succeed in Business",
      videoDuration: "3:30",
    },
    {
      title: "Quiz Time!",
      emoji: "🧠",
      isQuiz: true,
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-50 p-6">
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
            className="bg-orange-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="mb-8">
          {currentStepData.isQuiz ? (
            <FinanceQuiz quizData={miniBizQuiz} />
          ) : (
            <div className="space-y-6">
              <VideoPlayer
                videoId={`minibiz-${currentStep}`}
                title={currentStepData.videoTitle}
                duration={currentStepData.videoDuration}
              />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-3">📌 Key Takeaways:</h3>
                <ul className="space-y-2 text-lg">
                  {currentStep === 0 && (
                    <>
                      <li>✅ 6 businesses kids can start</li>
                      <li>✅ Some need supplies, others don't</li>
                      <li>✅ Pick something you enjoy</li>
                    </>
                  )}
                  {currentStep === 1 && (
                    <>
                      <li>✅ Get parent permission first</li>
                      <li>✅ Be honest and reliable</li>
                      <li>✅ Keep learning and improving</li>
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
            className="px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
