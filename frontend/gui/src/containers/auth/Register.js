import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

import { register } from '../../store/actions/auth'

class Register extends Component {
  constructor(props) {
    super(props);

    this.state= {
      username: "",
      email:"",
      password: "",
      password2: "",
      remember: false,
      validated: false
    }
  }
  static propTypes = {
    register: PropTypes.func.isRequired,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    password2: PropTypes.string,
    remember: PropTypes.bool.isRequired,
    validated: PropTypes.bool.isRequired
  }

  handleOnChange(event) {
    this.setState(
      {
        [event.target.name] : event.target.type === "checkbox"  ? event.target.checked : event.target.value,
      }
    )
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      console.log(this.state.username, this.state.email, this.state.password, this.state.remember)
      this.props.register(this.state.username,this.state.email, this.state.password, this.state.remember)
    }
    this.setState({ validated: true });
  }

  render() {
    return (
      <Container>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={e => this.handleOnSubmit(e)}
        >
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
            <Form.Group controlId="formUsername">
              <Form.Label>Nombre de usuario*</Form.Label>
              <Form.Control
                name="username"
                type="text"
                required
                value={this.state.username}
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Introduce un nombre de usuario.
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={this.state.email}
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Introduce un email válido.
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña*</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  required 
                  pattern=".{8,}"
                  value={this.state.password}
                  onChange={e => this.handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Introduce una contraseña de al menos 8 carácteres.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Form.Group controlId="formPassword2">
                <Form.Label>Repite la contraseña*</Form.Label>
                <Form.Control
                  name="password2"
                  type="password"
                  required 
                  pattern={this.state.password}
                  value={this.state.password2}
                  onChange={e => this.handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.password.length !==0 && "Las contraseñas deben de ser iguales."}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Form.Group controlId="formRemember">
                <Form.Check
                  custom
                  name="remember"
                  type="checkbox"
                  label="Recuérdame"
                  checked={this.state.remember}
                  onChange={e => this.handleOnChange(e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mt-2">
            <Col xs={12} sm={10} md={8} lg={6}className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Registrarse
              </Button>
              <span>¿Ya tienes cuenta?<Link to="/register">Inicia sesión</Link></span>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default connect(null, { register })(Register)
