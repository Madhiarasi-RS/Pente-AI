import React, { useState } from "react";
import PdfViewer from './PdfViewer';
import McqTest from './Test';
import Header from "../shared/Header";

const dummyQuestions = [
  {
    question: "What is the purpose of React useState hook?",
    options: ["Manage CSS", "Manage state", "Manage backend", "Create UI"],
    answer: "Manage state",
  },
  {
    question: "Which of these is not a lifecycle method?",
    options: ["componentDidMount", "useLayoutEffect", "render", "fetchAPI"],
    answer: "fetchAPI",
  },
  // Add 13 more or generate via Gemini AI
];

const InterviewPrep = () => {
  const [status, setStatus] = useState("To-do");
  const [showTest, setShowTest] = useState(false);
  const [score, setScore] = useState(null);

  const handleStatusChange = () => {
    if (status === "To-do") setStatus("Started");
    if (status === "Started") setStatus("Done");
  };

  const startTest = () => setShowTest(true);

  const calculateScore = (answers) => {
    const correct = dummyQuestions.filter((q, i) => answers[i] === q.answer);
    setScore(correct.length);
  };

  return (
         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
              <Header />
    <div className="p-6 dark:text-white space-y-6">
      <h1 className="text-3xl font-bold mb-4">📘 Interview Preparation</h1>

      {/* PDF Viewer */}
      <PdfViewer fileUrl="\pdfs\Introduction to SQL.pptx.pdf" />

      {/* Status Button */}
      <div className="mt-4">
        <p className="mb-2">Status: <span className="font-semibold">{status}</span></p>
        {status !== "Done" ? (
          <button
            onClick={handleStatusChange}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {status === "To-do" ? "Start Reading" : "Mark as Done"}
          </button>
        ) : (
          !showTest && (
            <button
              onClick={startTest}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Start Test
            </button>
          )
        )}
      </div>

      {/* MCQ Test */}
      {showTest && (
        <McqTest questions={dummyQuestions} onComplete={calculateScore} />
      )}

      {/* Show Score */}
      {score !== null && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded text-xl font-semibold">
          🎯 Your Score: {score}/15
        </div>
      )}
    </div>
    </div>
  );
};

export default InterviewPrep;
