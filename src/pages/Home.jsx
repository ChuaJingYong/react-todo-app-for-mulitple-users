import { useNavigate } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import TodoCard from "./TodoCard";

export default function Home() {
  // FUNCTIONS TO CREATE
  // Handle updating the todo completed status
  // Filter for all the todos attached to current id
  // Grab the current todo id and pass it as a parameter to the edit function (when clicked on edit)
  const { todos, token } = useContext(AuthContext);
  const [currentTodos, setCurrentTodos] = useState([]);

  function filterTodos() {
    // Filter for matching ids
    // Save it for current todos
    const email = token.email;
    const newTodos = todos.filter((todo) => todo.email === email);
    setCurrentTodos(newTodos);
  }

  useEffect(() => {
    if (token) {
      filterTodos();
    }
  }, [todos]);

  return (
    <>{token ? <TodoPage currentTodos={currentTodos} /> : <WelcomePage />}</>
  );
}

function WelcomePage() {
  return (
    <>
      <Container className="p-3">
        {/* <h1>Welcome to your personal Todo App!</h1>
            <h3>Please Login to get started</h3>
            <Button className="mt-3" onClick={handleLogin}>Login</Button> */}
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "url('your-image-url.jpg')",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              padding: "2rem",
              borderRadius: "10px",
            }}
          >
            <h1>Welcome to your personal Todo App!</h1>
            <p className="mt-3 mb-5">Please Login to get started</p>
            <a href="/login" className="btn btn-primary">
              Login
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}

function TodoPage({ currentTodos }) {
  return (
    <Container className="p-3">
      <h1>Todo Page</h1>

      <Row>
        {currentTodos.map((todo) => {
          return (
            <Col md={4} key={todo.id} className="p-3">
              <TodoCard todo={todo}></TodoCard>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
