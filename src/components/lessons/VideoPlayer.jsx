import React, { useState } from "react";

export default function VideoPlayer({ videoId, title, duration, onComplete }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulate video playing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          onComplete && onComplete();
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 300);
  };

  const handleReset = () => {
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-lg">
      {/* Video Container */}
      <div className="relative bg-black aspect-video flex items-center justify-center">
        {!isPlaying || progress === 100 ? (
          <div className="text-center">
            <div className="text-6xl mb-4">🎬</div>
            <p className="text-white text-2xl font-bold mb-6">{title}</p>
            <p className="text-gray-400 mb-6">{duration}</p>
            <button
              onClick={handlePlay}
              className="px-8 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition text-lg"
            >
              ▶️ {progress === 100 ? "Rewatch" : "Play"}
            </button>
          </div>
        ) : (
          <div className="text-center text-white">
            <div className="text-6xl mb-4 animate-pulse">🎥</div>
            <p className="text-2xl font-bold mb-2">Now Playing...</p>
            <p className="text-4xl font-bold text-red-500">{Math.min(Math.round(progress * (parseInt(duration) / 100)), parseInt(duration))}s / {duration}</p>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-gray-400 text-sm">
          <span>{Math.round(progress)}% watched</span>
          <button
            onClick={handleReset}
            className="text-red-500 hover:text-red-400"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
