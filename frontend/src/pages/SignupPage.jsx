import React from 'react';
import { Container, Row, Col } from 'reactstrap';
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

const SignupPage = () => {
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
              <h2 className='fw-bold mb-2 text-uppercase'>Sign Up</h2>
              <p className='text-white-50 mb-5'>Please enter your details to sign up!</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' type='text' size='lg' required />
             
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size='lg' required />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Confirm Password' id='formControlLg' type='password' size='lg' required />

              <MDBBtn outline className='mx-2 px-5 text-white-50' color='white' size='lg' onClick={handleSubmit}>
                Sign Up
              </MDBBtn>

              <div>
                <p className='mb-0'>
                  Already have an account? <a href='#!' className='text-white-50 fw-bold'>Login</a>
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
