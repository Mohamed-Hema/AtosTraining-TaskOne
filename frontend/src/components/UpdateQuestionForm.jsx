import React, { useState, useEffect } from 'react';

const UpdateQuestionForm = ({ questionId, initialQuestion, initialAnswer, onUpdate }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setQuestion(initialQuestion);
    setAnswer(initialAnswer);
  }, [initialQuestion, initialAnswer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onUpdate(questionId, question, answer);
  };

  return (
    <div>
      <h2>Update Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="answer">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateQuestionForm;
