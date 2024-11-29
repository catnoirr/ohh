"use client";

import Image from "next/image";
import { useState } from "react";

const QuizComponent = ({ quizQuestions, setSpinWheel, setQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSubmit = () => {
    if (selectedAnswer === currentQuestion.correctOption) {
      setIsCorrect(true);
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert("Quiz completed!");
        setQuiz(false);
        setSpinWheel(true);
      }
    } else {
      setIsCorrect(false);
    }
    setSelectedAnswer(null);
  };

  const handleTryAgain = () => {
    setIsCorrect(null);
  };

  return (
    <div className="relative flex flex-col h-screen bg-white sm:w-[30rem] w-full">
      <div className="relative bg-[#341266] w-full min-h-[12rem]">
        <Image
          src="/arrowLeft.png"
          width={100}
          height={100}
          className="w-3 absolute left-3 top-10"
        />
        <h3 className="text-white text-md absolute left-1/2 -translate-x-1/2 top-[33px]">Brand Quiz</h3>
      </div>
      <Image
        src="/circle.png"
        width={100}
        height={100}
        className="w-24 absolute z-20 -mt-20 right-8 top-40"
      />
      <div className="relative bg-white -mt-20 z-40 p-8 mx-6 rounded-xl">
        <Image
          src="/circle.png"
          width={100}
          height={100}
          className="w-8 absolute z-30 -mt-24 left-1/3 top-10"
        />
        <h3 className="text-xl font-semibold">Question {currentQuestionIndex + 1}
        </h3>
        <h4 className="mt-5 font-medium">
          Quiz Question
        </h4>
        <h2 className="text-lg mb-4 mt-1 bg-gray-100 border-gray-300 block py-1 mx-auto border px-5 rounded-lg cursor-pointer">
          {currentQuestion.question}
        </h2>

        <h4 className="mt-5 font-medium">
          Quiz Answer
        </h4>
        <div className="space-y-4 mt-2">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`block py-1 mx-auto border px-5 rounded-lg cursor-pointer ${selectedAnswer === index
                  ? "bg-purple-100 border-[#341266]"
                  : "bg-gray-100 border-gray-300"
                }`}
            >
              <input
                type="radio"
                name="quizOption"
                value={index}
                onChange={() => setSelectedAnswer(index)}
                checked={selectedAnswer === index}
                className="mr-2 hidden"
              />
              {option}
            </label>
          ))}
        </div>

        {isCorrect === false && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="flex justify-center sm:p-16 p-14">
              <Image
                src="/ooh.png"
                width={100}
                height={100}
                className="w-32"
              />
              </div>
              <h2 className="text-[#999999] text-sm mb-4">Wrong Answer please try again</h2>
              <button
                onClick={handleTryAgain}
                className="text-[#FF0000] border border-[#FF0000] py-2 px-4 w-full rounded-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className=" mt-2 mx-auto flex max-w-[15rem] justify-center bg-[#341266] rounded-md hover:bg-[#341266e4]">
        <button
          onClick={handleAnswerSubmit}
          className="mt-auto max-w-[15rem] text-center text-white px-5 py-2 "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;