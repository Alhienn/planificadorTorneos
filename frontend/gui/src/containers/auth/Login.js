import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

import { login } from '../../store/actions/auth'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state= {
      username: "",
      password: "",
      remember: false,
      validated: false
    }
  }
  static propTypes = {
    login: PropTypes.func.isRequired,
    username: PropTypes.string,
    password: PropTypes.string,
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
      this.props.login(this.state.username, this.state.password, this.state.remember)
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
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                name="username"
                type="text"
                required
                value={this.state.username}
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Introduce tu nombre de usuario.
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  required 
                  pattern=".{8,}"
                  value={this.state.password}
                  onChange={e => this.handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.password.length === 0 ?"Introduce tu contraseña." : "Las contraseñas son de la menos 8 carácteres" }
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
                Iniciar Sesión
              </Button>
              <span>¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link></span>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

export default connect(null, { login })(Login)