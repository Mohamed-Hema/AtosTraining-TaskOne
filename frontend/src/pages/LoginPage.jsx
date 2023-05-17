import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to the login endpoint of the auth-service
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      // Handle the response and any necessary actions
      console.log(response.data); // You can display a success message or redirect to another page

      // Update the isAuthenticated state variable
      setIsAuthenticated(true);

      // Redirect the user to the UserProfilePage
      navigate('/profile');
    } catch (error) {
      // Handle error
      if (error.response) {
        console.error(error.response.data); // You can display an error message
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center h-100 my-5'>
        <Col col='12'>
          <MDBCard
            className='bg-dark text-white my-5 mx-auto'
            style={{ borderRadius: '1rem', maxWidth: '400px' }}
          >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Login</h2>
              <p className='text-white-50 mb-5'>Please enter your login and password!</p>

             

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Username'
                id='formControlLg'
                type='text'
                size='lg'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Password'
                id='formControlLg'
                type='password'
                size='lg'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <p className='small mb-3 pb-lg-2'>
                <a className='text-white-50' href='#!'>
                  Forgot password?
                </a>
              </p>

              <MDBBtn
                outline
                className='mx-2 px-5 text-white-50'
                color='white'
                size='lg'
                onClick={handleSubmit}
              >
                Login
              </MDBBtn>

              <div>
                <p className='mb-0'>
                  Don&apos;t have an account?{' '}
                  <a href='/signup' className='text-white-50 fw-bold'>
                    Sign Up
                  </a>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;