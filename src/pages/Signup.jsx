import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import {
  Button,
  Form,
  Container,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userDatabase, setUserDatabase } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [hasMatchingUser, setHasMatchingUser] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();
  function ErrorModal() {
    return (
      <Modal show={showModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>User Existence Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          User already exists! Please try a different email.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function SuccessModal() {
    return (
      <Modal show={showModal} onHide={() => closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Successful Signup Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          New User is successfully added! Login to get started.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              closeModal();
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormSubmitted(true);
    const newUser = {
      email,
      password,
    };

    const userExists = userDatabase.find((element) => element.email === email);

    if (!userExists) {
      setHasMatchingUser(false);
      setUserDatabase((currentUsers) => [...currentUsers, newUser]);
    }
    // if (!userExists){
    //     setHasMatchingUser(true)
    //     setUserDatabase(currentUsers=>[...currentUsers,newUser])
    //     console.log('current users are now',userDatabase)
    //     setShowModal(true)
    // } else{
    //     console.log('USER ALREADY EXISTS')
    //     // setShowToast(true)
    //     setShowModal(true)
    // }
  }

  useEffect(() => {
    // Only runs when form has been submitted
    if (formSubmitted) {
      setShowModal(true);
    }
  }, [hasMatchingUser, formSubmitted]);

  function closeModal() {
    setShowModal(false);
    setFormSubmitted(false);
    // Set default matching users as true
    setHasMatchingUser(true);
  }

  return (
    <>
      <Container className="mt-3">
        <h1>Signup</h1>
        <h3>Please create your account to get started🔻!</h3>

        {/* USING A MODAL POPUP -- FOCUS THE USER'S ATTENTION MORE FORCEFULLY */}
        {showModal && (hasMatchingUser ? <ErrorModal /> : <SuccessModal />)}

        {/* USING TOAST -- LESS DISRUPTIVE TO THE USER EXPERIENCE */}
        {/* <ToastContainer
            position="top-center"
            className="p-5"
        >
            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide
                    // style={{ position: 'absolute', top: 20, left: "30" }}>
                    style={{ zIndex:1 }}>
                <Toast.Header>
                    <strong className="mr-auto">User Existence Alert</strong>
                </Toast.Header>
                <Toast.Body>User already exists! Try a different email.</Toast.Body>
            </Toast>
        </ToastContainer> */}

        <Form className="mt-5" onSubmit={handleSubmit}>
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
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
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
