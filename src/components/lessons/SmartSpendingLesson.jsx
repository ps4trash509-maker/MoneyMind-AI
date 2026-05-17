import React, { useState } from "react";

export default function SmartSpendingLesson() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [budget, setBudget] = useState("");
  const [spendingResult, setSpendingResult] = useState(null);

  const steps = [
    {
      title: "Wants vs Needs",
      emoji: "🛒",
      content: "Smart spending starts with understanding the difference between WANTS and NEEDS.",
      subtitle: "NEEDS are things you must have to survive.",
      items: [
        { type: "need", name: "Food", emoji: "🍎" },
        { type: "need", name: "Shelter", emoji: "🏠" },
        { type: "need", name: "Clothes", emoji: "👕" },
        { type: "need", name: "School supplies", emoji: "📚" },
      ],
    },
    {
      title: "Wants Explained",
      emoji: "🎮",
      content: "WANTS are things you'd like to have but don't need to survive.",
      subtitle: "It's okay to have wants, but they come AFTER needs!",
      items: [
        { type: "want", name: "Video games", emoji: "🎮" },
        { type: "want", name: "Movie tickets", emoji: "🎬" },
        { type: "want", name: "Candy/snacks", emoji: "🍭" },
        { type: "want", name: "New toy", emoji: "🧸" },
      ],
    },
    {
      title: "Budget Your Money",
      emoji: "💰",
      content: "Create a smart budget by deciding what to buy!",
      isCalculator: true,
    },
  ];

  const budgetItems = [
    { name: "Food & Snacks", emoji: "🍎", type: "need", cost: 8 },
    { name: "School Supplies", emoji: "📚", type: "need", cost: 5 },
    { name: "Video Game", emoji: "🎮", type: "want", cost: 20 },
    { name: "Movie Ticket", emoji: "🎬", type: "want", cost: 12 },
    { name: "New Shoes", emoji: "👟", type: "need", cost: 30 },
    { name: "Toy/Collectible", emoji: "🧸", type: "want", cost: 15 },
    { name: "Books", emoji: "📖", type: "need", cost: 10 },
    { name: "Candy", emoji: "🍭", type: "want", cost: 3 },
  ];

  const toggleItem = (itemName) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter((item) => item !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const calculateBudget = () => {
    if (!budget) {
      alert("Please enter a budget!");
      return;
    }

    const selectedDetails = budgetItems.filter((item) =>
      selectedItems.includes(item.name)
    );

    const totalCost = selectedDetails.reduce((sum, item) => sum + item.cost, 0);
    const needs = selectedDetails.filter((item) => item.type === "need");
    const wants = selectedDetails.filter((item) => item.type === "want");
    const remaining = budget - totalCost;

    setSpendingResult({
      totalCost,
      remaining,
      needsCount: needs.length,
      wantsCount: wants.length,
      isWithinBudget: remaining >= 0,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedItems([]);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedItems([]);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-6">
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
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-700 mb-2">{step.content}</p>
          {step.subtitle && (
            <p className="text-lg font-semibold text-green-600 mb-6">{step.subtitle}</p>
          )}

          {step.isCalculator ? (
            <div className="space-y-6">
              {/* Budget Input */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  How much money do you have to spend?
                </label>
                <div className="flex gap-2">
                  <span className="text-2xl font-bold">$</span>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Enter budget amount"
                    className="flex-1 p-3 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 text-lg"
                  />
                </div>
              </div>

              {/* Item Selection */}
              <div>
                <h3 className="text-xl font-bold mb-4">What do you want to buy? (Click to select)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {budgetItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => toggleItem(item.name)}
                      className={`p-4 rounded-2xl font-semibold transition ${
                        selectedItems.includes(item.name)
                          ? "bg-green-500 text-white shadow-lg"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-3xl mb-2">{item.emoji}</div>
                      <div className="text-sm">{item.name}</div>
                      <div className="text-xs mt-1">${item.cost}</div>
                      {item.type === "want" && (
                        <div className="text-xs italic mt-1 opacity-75">want</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={calculateBudget}
                className="w-full py-3 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition text-lg"
              >
                Check My Budget
              </button>

              {spendingResult && (
                <div
                  className={`rounded-2xl p-6 ${
                    spendingResult.isWithinBudget
                      ? "bg-green-50 border-2 border-green-300"
                      : "bg-red-50 border-2 border-red-300"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-4">📊 Your Spending Summary</h3>
                  <div className="space-y-3 text-lg">
                    <div className="flex justify-between border-b pb-2">
                      <span>Your Budget:</span>
                      <span className="font-bold">${budget}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Total Cost:</span>
                      <span className="font-bold">${spendingResult.totalCost}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Needs: {spendingResult.needsCount}</span>
                      <span>Wants: {spendingResult.wantsCount}</span>
                    </div>
                    <div
                      className={`flex justify-between pt-2 px-3 py-2 rounded-lg font-bold text-lg ${
                        spendingResult.isWithinBudget
                          ? "bg-green-200 text-green-700"
                          : "bg-red-200 text-red-700"
                      }`}
                    >
                      <span>Money Left:</span>
                      <span>${spendingResult.remaining}</span>
                    </div>
                    {spendingResult.isWithinBudget ? (
                      <p className="text-green-600 font-semibold mt-2">✅ Great! You're within budget!</p>
                    ) : (
                      <p className="text-red-600 font-semibold mt-2">❌ Over budget! Try removing some wants.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {step.items.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-2xl ${
                    item.type === "need"
                      ? "bg-blue-50 border-2 border-blue-300"
                      : "bg-pink-50 border-2 border-pink-300"
                  }`}
                >
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="font-bold text-lg">{item.name}</div>
                  <div
                    className={`text-sm mt-2 font-semibold ${
                      item.type === "need" ? "text-blue-600" : "text-pink-600"
                    }`}
                  >
                    {item.type.toUpperCase()}
                  </div>
                </div>
              ))}
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
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
