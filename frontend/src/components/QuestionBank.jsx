import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestionForm from './AddQuestionForm';
import DeleteQuestionForm from '../components/deleteQuestionForm';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  const onDeleteQuestion = async (questionId) => {
    try {
    await axios.delete(`http://localhost:4000/api/questions/${questionId}`)
    .then(response => {
    console.log(response);
    })
    .catch(error => {
    console.error('Error: ', error);
    });
    setQuestions((prevQuestions) =>
    prevQuestions.filter((question) => question.id !== questionId)
    );
    } catch (error) {
    console.error('Error: ', error);
    }
    };
   

  return (
    <div className="container">
      <h1 className="mb-4">Question Bank</h1>

      <div className="col-3 mb-4">
        <AddQuestionForm />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Questions</th>
            <th scope="col">Category</th>
            <th scope="col">Subcategory</th>
            <th scope="col">Marks</th>
            <th scope="col">Delete</th>
            <th scope="col">Update</th>
          </tr>
        </thead>
          <tbody>
          {questions.map((question) => (
            <tr key={question._id}>
              <td>{question.name}</td>
              <td>{question.category}</td>
              <td>{question.subcategory}</td>
              <td>{question.mark}</td>
              <td>
                <DeleteQuestionForm
                  questionId={question._id} // Pass the MongoDB-generated ID
                  onDeleteQuestion={onDeleteQuestion}
                />
              </td>
              <td>
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