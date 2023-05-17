import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
  
    try {
      // Make a POST request to the signup endpoint of the auth-service
      const response = await axios.post('http://localhost:5000/api/login/', {
        username,
        password
      });
  
      // Handle the response and any necessary actions
      console.log(response.data); // You can display a success message or redirect to another page
    } catch (error) {
      // Handle error
      if (error.response && error.response.data) {
        console.error(error.response.data); // You can display the error message received from the server
      } else {
        console.error(error.message); // Display a generic error message
      }
    }
  };
  

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center h-100 my-5'>
        <Col col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>

            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Sign Up</h2>
              <p className='text-white-50 mb-5'>Please enter your details to sign up!</p>
              <div className='mb-4 mx-5 w-100'>
                <label className='text-white' htmlFor='userType'>
                  Choose User
                </label>
                <select className='form-select form-select-lg' id='userType' required>
                  <option value=''>Select user type</option>
                  <option value='teacher'>Teacher</option>
                  <option value='student'>Student</option>
                </select>
              </div>
              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Username'
                id='formControlLg'
                type='text'
                size='lg'
                required
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
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBInput
                wrapperClass='mb-4 mx-5 w-100'
                labelClass='text-white'
                label='Confirm Password'
                id='formControlLg'
                type='password'
                size='lg'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <MDBBtn
                outline
                className='mx-2 px-5 text-white-50'
                color='white'
                size='lg'
                onClick={handleSubmit}
              >
                Sign Up
              </MDBBtn>

              <div>
                <p className='mb-0'>
                  Already have an account?{' '}
                  <a href='/login' className='text-white-50 fw-bold'>
                    Login
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

export default SignupPage;
