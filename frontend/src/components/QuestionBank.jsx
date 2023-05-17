import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const QuestionBank = () => {
  // Mock data for questions
  const questions = [
    { id: 1, question: 'What is the capital of France?' },
    { id: 2, question: 'Who wrote the Harry Potter series?' },
    { id: 3, question: 'What is the symbol for hydrogen?' },
  ];

  return (
    <div className="container">
      <h1 className="mb-4">Question Bank</h1>

      <div className="mb-4">
        <button className="btn btn-primary me-3">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Question
        </button>
        <button className="btn btn-secondary">
          <FontAwesomeIcon icon={faEdit} className="me-2" />
          Update Question
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Question</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <th scope="row">{question.id}</th>
              <td>{question.question}</td>
              <td>
                <button className="btn btn-sm btn-outline-danger me-2">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="btn btn-sm btn-outline-primary">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
