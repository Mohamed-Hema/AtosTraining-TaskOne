import axios from "axios";
const BASE_URL = "http://localhost:4000";

export const login = async ({id,
    name,
    category,
    subcategory,
    mark,
    expectedTime,
    correctAnswers,
    createdBy,
    answers,}) => {
    try {
      const response = await axios.post(`${BASE_URL}/questions`, { id,
        name,
        category,
        subcategory,
        mark,
        expectedTime,
        correctAnswers,
        createdBy,
        answers, });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };