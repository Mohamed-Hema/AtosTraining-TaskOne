import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

const LoginForm = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Check if the user is already logged in
  //   const userData = localStorage.getItem("userData");
  //   if (userData) {
  //     // User is already logged in
  //     // Redirect to UserProfilePage
  //     const { username, userType } = JSON.parse(userData);
  //     navigate("/profile", { state: { username, userType } });
  //   }
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login();

      // Authentication successful
      // Save the username and userType in localStorage
      localStorage.setItem(
        "userData",
        JSON.stringify({ username: '', userType: data.userType })
      );

      // Redirect to UserProfilePage
      navigate("/profile", { state: { username: '', userType: data.userType } });
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleLogin}>{/* Rest of your code */}</form>
    </div>
  );
};

export default LoginForm;
