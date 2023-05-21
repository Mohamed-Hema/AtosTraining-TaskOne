import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const UserProfile = ({ user }) => {
  return (
    <MDBContainer>
      <MDBRow className='justify-content-center'>
        <MDBCol md='6'>
          <MDBCard>
            <MDBCardBody>
              <h5 className='fw-bold mb-4'>User Profile</h5>
              <p>
                <strong>Name:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.userType}
              </p>
              {/* Add more user data fields as needed */}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UserProfile;
