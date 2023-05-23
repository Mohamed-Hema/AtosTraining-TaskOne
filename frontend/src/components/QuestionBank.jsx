import { useState, useEffect } from 'react';
import axios from 'axios';
import AddQuestionForm from './AddQuestionForm';
import DeleteQuestionForm from '../components/DeleteQuestionForm';
import EditQuestionForm from './EditQuestionForm';
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

  const handleDeleteQuestion = async (questionId) => {
    try {
      await axios.delete(`http://localhost:4000/api/questions/${questionId}`);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question._id !== questionId)
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
                  question={question}
                  onDeleteQuestion={handleDeleteQuestion}
                />
              </td>
              <td>
                <EditQuestionForm questionId={question._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
