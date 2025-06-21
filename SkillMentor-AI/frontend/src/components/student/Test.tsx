import React, { useState } from "react";

const Test = ({ questions = [], onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete(Object.values(answers));
  };

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => (
        <div key={idx} className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow">
          <p className="font-semibold mb-2">{idx + 1}. {q.question}</p>
          <div className="space-y-1">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`q-${idx}`}
                  value={opt}
                  disabled={submitted}
                  onChange={() => handleSelect(idx, opt)}
                  checked={answers[idx] === opt}
                />
                {opt}
              </label>
            ))}
          </div>
          {submitted && (
            <div className="mt-2 text-green-500">
              Correct Answer: {q.answer}
            </div>
          )}
        </div>
      ))}

      {!submitted && (
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Submit Test
        </button>
      )}
    </div>
  );
};

export default Test;
