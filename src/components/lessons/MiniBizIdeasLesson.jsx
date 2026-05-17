import React, { useState } from "react";

export default function MiniBizIdeasLesson() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedBiz, setSelectedBiz] = useState(null);
  const [interests, setInterests] = useState([]);

  const businesses = [
    {
      id: 1,
      name: "Lemonade Stand",
      emoji: "🍋",
      difficulty: "Easy",
      startupCost: "$5-10",
      earnPerDay: "$10-30",
      description: "Make fresh lemonade and sell it to neighbors and friends.",
      steps: [
        "Get a pitcher and cups",
        "Buy lemons, sugar, and water",
        "Make fresh lemonade",
        "Set up at home or park",
        "Sell to customers!",
      ],
      tips: [
        "Make it on a hot day",
        "Add fun flavors (strawberry, mint)",
        "Make a colorful sign",
        "Offer snacks too",
      ],
    },
    {
      id: 2,
      name: "Bracelet Making",
      emoji: "💎",
      difficulty: "Easy",
      startupCost: "$3-8",
      earnPerDay: "$15-40",
      description: "Create colorful bracelets and sell them to friends and family.",
      steps: [
        "Buy beads and string/elastic",
        "Learn different patterns",
        "Make unique designs",
        "Package them nicely",
        "Sell online or at school",
      ],
      tips: [
        "Make them custom with names",
        "Use trendy colors",
        "Package in nice boxes",
        "Take good photos",
      ],
    },
    {
      id: 3,
      name: "Lawn Mowing",
      emoji: "🔪",
      difficulty: "Medium",
      startupCost: "$0 (use family lawnmower)",
      earnPerDay: "$20-50",
      description: "Help neighbors by mowing their lawns for a fee.",
      steps: [
        "Ask permission from parents",
        "Offer service to neighbors",
        "Set a fair price ($5-10 per lawn)",
        "Do quality work",
        "Get referrals!",
      ],
      tips: [
        "Be responsible and safe",
        "Do a thorough job",
        "Build long-term clients",
        "Offer add-ons (raking leaves)",
      ],
    },
    {
      id: 4,
      name: "Dog Walking",
      emoji: "🐕",
      difficulty: "Easy",
      startupCost: "$0",
      earnPerDay: "$10-30",
      description: "Walk dogs for busy neighbors and pet owners.",
      steps: [
        "Ask neighbors if they need help",
        "Learn how to handle different dogs",
        "Set a price per walk",
        "Be reliable and responsible",
        "Earn repeat customers!",
      ],
      tips: [
        "Be dependable",
        "Love animals",
        "Walk them safely",
        "Start with one dog",
        "Build trust with owners",
      ],
    },
    {
      id: 5,
      name: "Cookie Selling",
      emoji: "🍪",
      difficulty: "Easy",
      startupCost: "$5-15",
      earnPerDay: "$20-50",
      description: "Bake delicious cookies and sell them to the community.",
      steps: [
        "Choose your recipes",
        "Buy ingredients",
        "Bake with parent help",
        "Package nicely",
        "Sell at school or events",
      ],
      tips: [
        "Bake your best recipes",
        "Make them fresh daily",
        "Nice packaging matters",
        "Get food permits if needed",
      ],
    },
    {
      id: 6,
      name: "Tutoring",
      emoji: "📚",
      difficulty: "Medium",
      startupCost: "$0",
      earnPerDay: "$15-50",
      description: "Help younger kids with their schoolwork.",
      steps: [
        "Pick your favorite subject",
        "Offer to tutor friends",
        "Explain topics clearly",
        "Set a price per hour",
        "Build reputation",
      ],
      tips: [
        "Be patient and kind",
        "Make learning fun",
        "Track progress",
        "Charge $10-15/hour",
      ],
    },
  ];

  const steps = [
    {
      title: "Small Business Ideas",
      emoji: "🚀",
      content: "Learn about real business ideas that kids can safely start!",
    },
    {
      title: "Success Tips",
      emoji: "⭐",
      content: "Key things to remember when running a business:",
    },
  ];

  const toggleInterest = (bizName) => {
    if (interests.includes(bizName)) {
      setInterests(interests.filter((item) => item !== bizName));
    } else {
      setInterests([...interests, bizName]);
    }
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
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{step.emoji}</div>
          <h1 className="text-4xl font-bold mb-2">{step.title}</h1>
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
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-xl text-gray-700 mb-6">{step.content}</p>

          {currentStep === 0 ? (
            <div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {businesses.map((biz) => (
                  <div
                    key={biz.id}
                    onClick={() => setSelectedBiz(selectedBiz?.id === biz.id ? null : biz)}
                    className={`p-6 rounded-2xl cursor-pointer transition border-2 ${
                      selectedBiz?.id === biz.id
                        ? "bg-orange-100 border-orange-500 shadow-lg"
                        : "bg-gray-50 border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="text-5xl mb-3">{biz.emoji}</div>
                    <h3 className="text-2xl font-bold mb-2">{biz.name}</h3>
                    <p className="text-gray-700 mb-3">{biz.description}</p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Difficulty:</strong> {biz.difficulty}
                      </p>
                      <p>
                        <strong>Startup:</strong> {biz.startupCost}
                      </p>
                      <p>
                        <strong>Earn:</strong> {biz.earnPerDay}/day
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedBiz && (
                <div className="bg-orange-50 border-2 border-orange-300 rounded-2xl p-6">
                  <h2 className="text-3xl font-bold mb-4">How to Start: {selectedBiz.name}</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-3">📋 Steps:</h3>
                      <ol className="space-y-2">
                        {selectedBiz.steps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-xl font-bold mr-3 text-orange-500">
                              {index + 1}.
                            </span>
                            <span className="text-lg">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-3">💡 Tips for Success:</h3>
                      <ul className="space-y-2">
                        {selectedBiz.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-xl mr-2">✨</span>
                            <span className="text-lg">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-4">
                  <h3 className="text-xl font-bold mb-2">✅ Be Responsible</h3>
                  <p className="text-gray-700">Get parent permission before starting any business. Follow all rules and safety guidelines.</p>
                </div>
                <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-4">
                  <h3 className="text-xl font-bold mb-2">💰 Track Your Money</h3>
                  <p className="text-gray-700">Keep records of what you spend and earn. Use a notebook or spreadsheet.</p>
                </div>
                <div className="bg-purple-50 border-2 border-purple-300 rounded-2xl p-4">
                  <h3 className="text-xl font-bold mb-2">🤝 Provide Great Service</h3>
                  <p className="text-gray-700">Do your best work. Happy customers will recommend you to others!</p>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4">
                  <h3 className="text-xl font-bold mb-2">💪 Never Give Up</h3>
                  <p className="text-gray-700">Starting a business takes time. Stay positive and keep improving!</p>
                </div>
              </div>
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
            className="px-6 py-3 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
