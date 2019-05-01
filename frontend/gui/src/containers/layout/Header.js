import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto">
        <LinkContainer to="/register">
          <Nav.Link>{user}</Nav.Link>
        </LinkContainer>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto">
        <LinkContainer to="/register">
          <Nav.Link>Registrarse</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/login">
          <Nav.Link>Iniciar sesión</Nav.Link>
        </LinkContainer>
      </Nav>
    );

    return (
      <Navbar bg="light" expand="sm">
        <LinkContainer to="/">
          <Navbar.Brand>Planificador Torneos</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { isAuthenticated ? authLinks : guestLinks }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
})

export default connect(mapStateToProps)(Header)