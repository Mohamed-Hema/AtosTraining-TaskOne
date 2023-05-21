import  { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [mark, setMark] = useState('');
  const [expectedTime, setExpectedTime] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [answers, setAnswers] = useState('');
 
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  const response = await axios.post('http://localhost:4000/questions', {
  name,
  category,
  subcategory,
  mark,
  expectedTime,
  correctAnswers,
  createdBy,
  answers,
  });
  console.log(response.data);
  } catch (error) {
  console.error(error);
  }
  };

  return (
    <div>
      <h2>Add Question</h2>
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
