import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function EditTodo() {
  const { todos, setTodos, token } = useContext(AuthContext);
  const id = parseInt(useParams().id);
  const navigate = useNavigate();

  const currentTodo = todos.find((todo) => todo.id === id);
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);
  const [completed, setCompleted] = useState(currentTodo.completed);

  function EditTodo(event) {
    event.preventDefault();

    const updatedTodos = todos.map((todo) => {
      // Find for matching todo
      if (todo.id === id) {
        return {
          id,
          email: todo.email,
          title,
          description,
          completed,
        };
      }

      return todo;
    });

    setTodos(updatedTodos);
    navigate("/");
  }

  // Run only once to initialize the form values
  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description);
      setCompleted(currentTodo.completed);
    }
  }, []);

  return (
    <>
      <Container className="p-3">
        <h1>Edit Todo</h1>

        <Form onSubmit={EditTodo}>
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
