import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };

    fetchQuestions();
  }, []);

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
              <td>{question.name}</td>
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
