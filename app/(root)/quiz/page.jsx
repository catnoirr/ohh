"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { MyContext } from "@/context/MyContext";

const categories = [
    { name: "Education", image: "/carousel.png" },
    { name: "Business", image: "/carousel.png" },
    { name: "Fast-Food", image: "/carousel.png" },
    { name: "Travel & Experiences", image: "/carousel.png" },
    { name: "Technology & Gadgets", image: "/carousel.png" },
    { name: "Entertainment", image: "/carousel.png" },
    { name: "Fashion & Lifestyle", image: "/carousel.png" },
    { name: "Books & Stationery", image: "/carousel.png" },
    { name: "Financial Planning", image: "/carousel.png" },
    { name: "Social Causes & Charity", image: "/carousel.png" },
    { name: "Home & Living", image: "/carousel.png" },
    { name: "Others", image: "/carousel.png" },
  ];

const quizQuestions = [
  {
    question: "Age group",
    options: ["18-24", "25-34", "35-44", "45-54", "55+"],
  },
  {
    question: "What Life Stage are you in?",
    options: ["Student", "Young Professional", "Parent", "Retire", "Other"],
  },
  {
    question: "What Type of Rewards Interests you the most?",
    options: ["Discount on purchase", "Free Products", "Both"],
  },
];

const Personalize = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { user } = useContext(MyContext);
  console.log(user)
  const router = useRouter();
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const selectAllCategories = () => {
    setSelectedCategories(categories.map((cat) => cat.name));
  };

  const handleNextClick = () => {
    console.log(selectedCategories.length)
    if(selectedCategories.length === 0){
        return
    }
    setShowQuiz(true);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSubmit = async () => {
    console.log(selectedAnswer)
    if (selectedAnswer !== null) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(updatedAnswers); // Update the answers state
  
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null); // Reset selected answer for the next question
      } else {
        // Submit the data when quiz is completed
        await submitData(updatedAnswers); // Pass the updated answers array
      }
    }
  };
  
  const submitData = async (submittedAnswers) => {
    try {
      // Assuming you are sending data to an API or saving to Firestore
      const data = {
        userId: user.userId, // Get user ID from context
        interests: selectedCategories,
        qna: quizQuestions.map((q, i) => ({
          question: q.question,
          answer: q.options[submittedAnswers[i]], // Use the stored answers
        })),
      };
  
      // Simulating API call
      console.log("Submitting data:", data);

      const res =  await fetch('/api/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.userId,
          ...data,
        }),
      });

      if(res.status === 200){
          router.push("/"); // Assuming `/` is the home route
    }
    
      // After successful submission, navigate to the home page
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div className="bg-white px-6 py-4 mx-auto sm:w-[30rem] w-full">
      {!showQuiz ? (
        <>
          <header className="text-center mb-6">
            <img src="/logo.png" alt="Logo" className="mx-auto mb-4 w-16 h-16" />
            <h1 className="text-xl font-bold">Let’s Personalize things</h1>
            <p className="text-gray-600">Which Categories are you most interested in?</p>
          </header>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {categories.map((category, index) => (
              <div
                key={index}
                onClick={() => toggleCategory(category.name)}
                className={`relative cursor-pointer transition-transform`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className={`w-24 h-24 object-cover rounded-2xl mx-auto mb-2 p-1 ${
                    selectedCategories.includes(category.name)
                      ? "border border-green-500 scale-105"
                      : ""
                  }`}
                />
                <p className="text-center font-semibold text-sm">{category.name}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center gap-5 w-full">
            <button
              onClick={selectAllCategories}
              className="border border-[#6825CC] w-full text-[#6825CC] py-2 px-6 font-semibold"
            >
              Select All
            </button>
            <button
              onClick={handleNextClick}
              className="bg-[#6825CC] border border-[#6825CC] w-full text-white py-2 px-6 font-semibold"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className=" bg-white">
          <Image src="/logo.png" width={100} height={100} className="mx-auto w-14 mt-10" />
          <h3 className="text-xl mt-10 font-bold text-center">Let's personalize things for you</h3>
          <h2 className="text-lg mb-4 mt-1 text-center">{currentQuestion.question}</h2>
          <div className="space-y-4 mt-10">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className={`block py-2 mx-auto border max-w-[16rem] text-center rounded-lg cursor-pointer ${
                  selectedAnswer === index ? "bg-purple-100 border-[#341266]" : "bg-gray-100 border-gray-300"
                }`}
                onClick={() => setSelectedAnswer(index)}
              >
                {option}
              </label>
            ))}
          </div>

          <div className="flex items-center flex-col gap-6 justify-between mt-8">
            <button
              onClick={handleAnswerSubmit}
              className="mt-6 bg-[#341266] text-white py-2 px-6 text-center font-semibold rounded-lg"
            >
              {currentQuestionIndex < quizQuestions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
          <Image src="/circle.png" width={100} height={100} className="ml-52 w-20 mt-5" />
          <div className="w-14 h-14 ml-40 -mt-5 bg-[#1D5DFF2E] rounded-full"></div>
        </div>
      )}
    </div>
  );
};

export default Personalize;
