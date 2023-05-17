import React from 'react';
import UserProfile from '../components/UserProfile';

const UserProfilePage = () => {
  // Example user data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    // Add more user data fields as needed
  };

  return <UserProfile user={user} />;
};

export default UserProfilePage;
