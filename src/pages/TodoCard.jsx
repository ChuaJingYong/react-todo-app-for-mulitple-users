import { useContext, useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function TodoCard({ todo }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { todos, setTodos } = useContext(AuthContext);

  const bg = todo.completed ? "success" : "danger";

  function handleDelete() {
    const currentId = todo.id;
    const updatedTodos = todos.filter((todo) => todo.id !== currentId);
    setTodos(updatedTodos);
    setShow(false);
  }

  function handleClose() {
    setShow(false);
  }

  function DeleteConfirmation() {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleDelete}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  // Get the todo id
  // Pass the todo id as a parameter

  return (
    <>
      <Card border={bg}>
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <div className="d-flex gap-3">
            <Button href={`todo/${todo.id}`} variant="secondary">
              <i className="bi bi-pencil"></i>
            </Button>
            <Button variant="danger" onClick={() => setShow(true)}>
              <i className="bi bi-trash3"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>

      <DeleteConfirmation></DeleteConfirmation>
    </>
  );
}
