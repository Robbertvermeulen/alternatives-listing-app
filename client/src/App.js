import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import bootstrap components
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

// Import page components
import LoginPage from "./pages/LoginPage";
import Navbar from "react-bootstrap/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Alternatives listing</Navbar.Brand>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/topics">
            Topics
          </Link>
          <Link className="nav-link" to="/alternatives">
            Alternatives
          </Link>
        </Nav>
        <Nav>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path="/"></Route>
        <Route exact path="/login">
          <LoginPage></LoginPage>
        </Route>
        <Route exact path="/signup"></Route>
      </Switch>
    </Router>
  );
};

export default App;
