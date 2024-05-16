import { useState, createContext } from "react";
import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./contexts/AuthContext";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import useLocalStorage from "use-local-storage";
import "./App.css";
// Routes setup
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import Signup from "./pages/Signup";

function Layout({ data }) {
  const navigate = useNavigate();
  const { token, setToken } = data;

  function handleSelect(eventKey) {
    console.log("event key value", eventKey);
    navigate(eventKey);
  }

  function handleLogOut() {
    setToken(null);
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">My Todo App</Navbar.Brand>
          <Nav
            variant="tabs"
            className="justify-content-between"
            onSelect={(eventKey) => {
              handleSelect(eventKey);
            }}
          >
            {token && (
              <Nav.Item>
                <Nav.Link href="#first" className="mx-3" eventKey={"/add"}>
                  <Button>Add Todo</Button>
                </Nav.Link>
              </Nav.Item>
            )}
            {!token && (
              <div className="d-flex">
                <Nav.Item>
                  <Nav.Link
                    href="#login"
                    className="btn btn-warning mx-3"
                    eventKey={"/login"}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="#signup"
                    className="btn btn-warning"
                    eventKey={"/signup"}
                  >
                    Signup
                  </Nav.Link>
                </Nav.Item>
              </div>
            )}
            {token && (
              <div>
                <Nav.Item>
                  <Nav.Link
                    href=""
                    className="btn btn-warning my-2"
                    eventKey={"/"}
                    onClick={handleLogOut}
                  >
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </div>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Outlet></Outlet>
    </>
  );
}

function App() {
  // Create a way to login and add todos that belongs to a specific user
  // user array
  // [{id:1, user:'Jing Yong'}]

  // Todo array
  // [{id:12345, userId: 1, title: 'lunch', description: 'fried chicken', completed: 'false'}]

  // only show todos that belongs to the user

  // Pseudocode
  // Create a user login page
  // Create the routes
  // Use nav to redirect the user after creating an account
  // Use nav to redirect the user after user logins
  // Put check conditions to allow the home page access when login conditions are met

  const [token, setToken] = useLocalStorage("authToken", null);
  const [userDatabase, setUserDatabase] = useLocalStorage("userDatabase", []);
  const [todos, setTodos] = useLocalStorage("v2Todos", []);

  return (
    <>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          userDatabase,
          setUserDatabase,
          todos,
          setTodos,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout data={{ token, setToken }} />}>
              <Route index element={<Home></Home>}></Route>
              <Route element={<Login></Login>} path="login"></Route>
              <Route element={<Signup></Signup>} path="signup"></Route>
              <Route element={<AddTodo></AddTodo>} path="add"></Route>
              <Route element={<EditTodo></EditTodo>} path="todo/:id"></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
