import { useNavigate } from "react-router-dom";
import { Card, Nav } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function NavBar() {
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleSelect(eventKey) {
    console.log("event key value", eventKey);
    navigate(eventKey);
  }

  function handleLogOut() {
    setToken(null);
  }

  return (
    <Card>
      <Card.Header className="pb-3">
        <Nav
          variant="tabs"
          className="justify-content-between"
          onSelect={(eventKey) => {
            handleSelect(eventKey);
          }}
        >
          <Nav.Item>
            <Nav.Link
              href="#first"
              className="btn btn-warning"
              eventKey={"/add-todo"}
            >
              Add Todo
            </Nav.Link>
          </Nav.Item>
          {!token && (
            <div className="d-flex">
              <Nav.Item>
                <Nav.Link
                  href="#login"
                  className="btn btn-warning"
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
                  className="btn btn-warning"
                  eventKey={"/"}
                  onClick={handleLogOut}
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            </div>
          )}
        </Nav>
      </Card.Header>
    </Card>
  );
}

export default NavBar;
