import { useState } from 'react';
import UserProfile from '../components/UserProfile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    username: '',
    userType: ''
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username: user.username,
        userType: user.userType
      });
      console.log(user);
      // Update the user state with the response data
      setUser({
        username: response.data.username,
        userType: response.data.userType,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <UserProfile
      user={user}
      isAuthenticated={isAuthenticated}
      setIsAuthenticated={setIsAuthenticated}
      onSubmit={onSubmit}
    />
  );
};

export default UserProfilePage;
