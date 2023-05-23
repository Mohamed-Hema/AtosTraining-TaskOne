import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

const DeleteQuestionForm = ({ question, onDeleteQuestion }) => {
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/questions/${question._id}`, {
        method: 'DELETE'
      });
      onDeleteQuestion(question._id);
      setShowModal(false);
      console.log(question._id)

      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div>
      {/* Button to trigger the modal */}
      <Button variant="secondary" onClick={handleShowModal}>
        <FontAwesomeIcon icon={faTrash} className="" />
      </Button>

      {/* Modal structure */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this question?</p>
          {confirmDelete && <p>This action cannot be undone.</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          {confirmDelete ? (
            <Button variant="danger" onClick={handleDelete}>
              Confirm Delete
            </Button>
          ) : (
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

DeleteQuestionForm.propTypes = {
  question: PropTypes.object.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired,
};

export default DeleteQuestionForm;
