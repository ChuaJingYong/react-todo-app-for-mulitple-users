import { AuthContext } from "../contexts/AuthContext";
import { Button, Form, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { todos, setTodos, token } = useContext(AuthContext);

  const navigate = useNavigate();

  function addTodo(event) {
    event.preventDefault();
    const email = token.email;
    setTodos([
      ...todos,
      { id: Date.now(), email, title, description, completed },
    ]);
    navigate("/");
  }

  return (
    <>
      <Container className="p-3">
        <h1>Add Todo</h1>

        <Form onSubmit={addTodo}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Get 100 paying customers"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder={`1. Create an amazing product\n2. List the product on Etsy and other platforms\n3. Crush the sales`}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Check
            type="checkbox"
            id="completed"
            label="Mark as completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mb-3"
          ></Form.Check>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
