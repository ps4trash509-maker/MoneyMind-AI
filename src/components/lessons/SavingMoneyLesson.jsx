import React, { useState } from "react";

export default function SavingMoneyLesson() {
  const [currentStep, setCurrentStep] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState("");
  const [weeklySavings, setWeeklySavings] = useState("");
  const [result, setResult] = useState(null);

  const steps = [
    {
      title: "Why Save Money?",
      emoji: "💰",
      content: "Saving money helps you reach your goals! Whether you want a video game, new shoes, or a bike, saving lets you buy things you really want.",
      tips: [
        "Set a specific goal (e.g., save $50 for a bike)",
        "Decide how much to save each week",
        "Keep your savings in a safe place",
        "Track your progress to stay motivated",
      ],
    },
    {
      title: "The Power of Compound Savings",
      emoji: "📈",
      content: "When you save consistently, your money grows! Even small amounts add up over time.",
      tips: [
        "Saving $5/week = $260 in a year!",
        "Saving $10/week = $520 in a year!",
        "Saving $20/week = $1,040 in a year!",
        "The earlier you start, the more you save",
      ],
    },
    {
      title: "Create Your Savings Plan",
      emoji: "🎯",
      content: "Let's calculate how long it takes to reach your goal!",
      isCalculator: true,
    },
  ];

  const calculateSavings = () => {
    if (!savingsGoal || !weeklySavings) {
      alert("Please fill in both fields!");
      return;
    }

    const weeks = Math.ceil(savingsGoal / weeklySavings);
    const months = (weeks / 4).toFixed(1);
    const totalSaved = weeklySavings * weeks;

    setResult({
      weeks,
      months,
      totalSaved,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{step.emoji}</div>
          <h1 className="text-4xl font-bold mb-2">{step.title}</h1>
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
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-700 mb-6">{step.content}</p>

          {step.isCalculator ? (
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  What's your savings goal? (e.g., $50, $100)
                </label>
                <input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  placeholder="Enter amount in dollars"
                  className="w-full p-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold mb-2">
                  How much will you save each week?
                </label>
                <input
                  type="number"
                  value={weeklySavings}
                  onChange={(e) => setWeeklySavings(e.target.value)}
                  placeholder="Enter weekly amount in dollars"
                  className="w-full p-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                onClick={calculateSavings}
                className="w-full py-3 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition"
              >
                Calculate My Timeline
              </button>

              {result && (
                <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-6 mt-6">
                  <h3 className="text-2xl font-bold mb-4">🎉 Your Savings Plan</h3>
                  <div className="space-y-3 text-lg">
                    <p>
                      <strong>Goal:</strong> ${savingsGoal}
                    </p>
                    <p>
                      <strong>Weekly Savings:</strong> ${weeklySavings}
                    </p>
                    <p className="text-xl font-bold text-blue-600">
                      ⏰ You'll reach your goal in {result.weeks} weeks ({result.months} months)!
                    </p>
                    <p className="text-sm text-gray-600">
                      By then, you'll have saved ${result.totalSaved}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xl font-bold mb-4">💡 Key Tips:</h3>
              <ul className="space-y-2">
                {step.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-4">✓</span>
                    <span className="text-lg text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-400 text-white font-bold rounded-2xl hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
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
