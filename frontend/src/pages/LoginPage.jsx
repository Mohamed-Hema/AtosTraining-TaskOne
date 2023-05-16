import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import LoginForm from '../components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <Container>
      <Row className='d-flex justify-content-center align-items-center h-100 my-5'>
        <Col col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className='fw-bold mb-2 text-uppercase'>Login</h2>
              <p className='text-white-50 mb-5'>Please enter your login and password!</p>

              <div className='mb-4 mx-5 w-100'>
                <label className='text-white' htmlFor='userType'>
                  User Type
                </label>
                <select className='form-select form-select-lg' id='userType' required>
                  <option value=''>Select user type</option>
                  <option value='teacher'>Teacher</option>
                  <option value='student'>Student</option>
                </select>
              </div>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='text' size='lg' required />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size='lg' required />

              <p className='small mb-3 pb-lg-2'>
                <a className='text-white-50' href='#!'>
                  Forgot password?
                </a>
              </p>

              <MDBBtn outline className='mx-2 px-5 text-white-50' color='white' size='lg' onClick={handleSubmit}>
                Login
              </MDBBtn>

              <div>
                <p className='mb-0'>
                  Don&apos;t have an account? <a href='#!' className='text-white-50 fw-bold'>Sign Up</a>
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
