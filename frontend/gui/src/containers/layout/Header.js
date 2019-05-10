import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { connect } from 'react-redux';

import { logout } from '../../store/actions/auth';
 
class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }
  
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Nav className="ml-auto">
        <NavDropdown
          alignRight
          title={user && user.username} id="nav-dropdown"
        >
        <LinkContainer to="/user">
          <NavDropdown.Item>Tus datos</NavDropdown.Item>
        </LinkContainer>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.props.logout}>Cerrar Sesión</NavDropdown.Item>
        </NavDropdown>
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
      <Navbar bg="light" expand="sm" className="mb-4">
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
  auth: state.authReducer,
})

export default connect(mapStateToProps, { logout })(Header)