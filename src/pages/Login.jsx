import { useContext, useState } from "react";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accNotFound, setAccNotFound] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const { token, setToken, userDatabase, setUserDatabase } =
    useContext(AuthContext);

  // Setting modal properties
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    // Check if the user has matching email
    // If not, alert the user not found, please create an account (modal + redirect)
    // If yes, check for pw
    // if pw matches, then return true
    // If not matches, ask user to try again (modal)
    const userExists = userDatabase.find((user) => user.email === email);

    if (userExists) {
      if (userExists.password === password) {
        const token = {
          value: "1234",
          email,
        };
        setToken(token);
        navigate("/");
      } else {
        // alert(`password doesn't match! Please try again`)
        setModalTitle(`Incorrect Password`);
        setModalBody(`Please try again!`);
        setShowModal(true);
      }
    } else {
      // alert(`user is not recognized. Please create an account`)
      setShowModal(true);
      setModalTitle(`Account Not Found`);
      setModalBody(`Please try again or signup with a new account!`);
      setAccNotFound(true);
    }
  }

  function ErrorModal() {
    return (
      <Modal show={showModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal()}>
            Retry
          </Button>
          {accNotFound && (
            <Button
              variant="success"
              onClick={() => {
                closeModal();
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    );
  }

  function closeModal() {
    setShowModal(false);

    if (accNotFound) {
      setAccNotFound(false);
    }
  }

  return (
    <>
      <Container className="p-3">
        <h1>Login</h1>
        <h3>Login to get started💪!</h3>

        <ErrorModal></ErrorModal>

        <Form className="mt-5" onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={passwordType}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Check Password"
              onClick={(e) => {
                e.target.checked
                  ? setPasswordType("text")
                  : setPasswordType("password");
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {/* Note: Use onSubmit when attached to form, use onClick when attached to button */}
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
