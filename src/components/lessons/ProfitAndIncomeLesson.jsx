import React, { useState } from "react";

export default function ProfitAndIncomeLesson() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [revenue, setRevenue] = useState("");
  const [costs, setCosts] = useState("");
  const [profitResult, setProfitResult] = useState(null);

  const steps = [
    {
      title: "What is Income?",
      emoji: "💵",
      content: "Income is money you earn! It can come from jobs, selling things, or running a business.",
      examples: [
        "Getting paid for a chore: $5",
        "Selling lemonade: $20 per day",
        "Tutoring a younger friend: $10 per hour",
        "Birthday money from family: $50",
        "Selling handmade crafts: $15 each",
      ],
    },
    {
      title: "What is Profit?",
      emoji: "📈",
      content: "Profit is the money left AFTER you pay for everything. It's what you keep!",
      examples: [
        "Sell lemonade for $30, costs $5 for supplies = $25 profit",
        "Sell 10 bracelets for $50, costs $10 in beads = $40 profit",
        "Mow 5 lawns for $50, costs $20 in gas = $30 profit",
        "Sell cookies for $40, costs $15 in ingredients = $25 profit",
      ],
    },
    {
      title: "Calculate Your Profit",
      emoji: "🧮",
      content: "Learn how profit works by calculating your own business!",
      isCalculator: true,
    },
  ];

  const businesses = [
    { name: "Lemonade Stand", icon: "🍋", avgRevenue: 30, avgCosts: 5 },
    { name: "Lawn Mowing", icon: "🔪", avgRevenue: 50, avgCosts: 10 },
    { name: "Bracelet Making", icon: "💎", avgRevenue: 40, avgCosts: 8 },
    { name: "Car Washing", icon: "🚗", avgRevenue: 60, avgCosts: 12 },
    { name: "Dog Walking", icon: "🐕", avgRevenue: 25, avgCosts: 0 },
    { name: "Cookie Selling", icon: "🍪", avgRevenue: 35, avgCosts: 10 },
  ];

  const calculateProfit = () => {
    if (!revenue || !costs) {
      alert("Please fill in both fields!");
      return;
    }

    const profit = revenue - costs;
    const profitMargin = ((profit / revenue) * 100).toFixed(1);

    setProfitResult({
      revenue: parseFloat(revenue),
      costs: parseFloat(costs),
      profit,
      profitMargin,
    });
  };

  const selectBusiness = (business) => {
    setSelectedBusiness(business);
    setRevenue(business.avgRevenue.toString());
    setCosts(business.avgCosts.toString());
    setProfitResult(null);
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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-purple-50 p-6">
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
            className="bg-purple-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-700 mb-6">{step.content}</p>

          {step.isCalculator ? (
            <div className="space-y-6">
              {/* Business Selection */}
              <div>
                <h3 className="text-xl font-bold mb-4">Pick a Business or Enter Your Own:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {businesses.map((business, index) => (
                    <button
                      key={index}
                      onClick={() => selectBusiness(business)}
                      className={`p-4 rounded-2xl font-bold transition ${
                        selectedBusiness?.name === business.name
                          ? "bg-purple-500 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-3xl mb-1">{business.icon}</div>
                      {business.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Input */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-lg font-bold">Or enter your own numbers:</h3>
                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Total Revenue (Money you earn): $
                  </label>
                  <input
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    placeholder="Enter revenue"
                    className="w-full p-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold mb-2">
                    Total Costs (Money you spend): $
                  </label>
                  <input
                    type="number"
                    value={costs}
                    onChange={(e) => setCosts(e.target.value)}
                    placeholder="Enter costs"
                    className="w-full p-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-purple-500"
                  />
                </div>

                <button
                  onClick={calculateProfit}
                  className="w-full py-3 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 transition"
                >
                  Calculate Profit
                </button>
              </div>

              {profitResult && (
                <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">📊 Your Profit Breakdown</h3>
                  <div className="space-y-3 text-lg">
                    <div className="flex justify-between border-b pb-2">
                      <span>Revenue (Total earned):</span>
                      <span className="font-bold">${profitResult.revenue}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Costs (Total spent):</span>
                      <span className="font-bold">-${profitResult.costs}</span>
                    </div>
                    <div className="flex justify-between pt-2 bg-purple-200 px-3 py-2 rounded-lg">
                      <span className="font-bold">Profit (What you keep):</span>
                      <span className="font-bold text-lg text-purple-700">${profitResult.profit}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Profit Margin: {profitResult.profitMargin}% (You keep {profitResult.profitMargin}% of what you earn)
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-xl font-bold mb-4">📌 Examples:</h3>
              <ul className="space-y-2">
                {step.examples.map((example, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-4">💡</span>
                    <span className="text-lg text-gray-700">{example}</span>
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
            className="px-6 py-3 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
