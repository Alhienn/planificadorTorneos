import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

export default class Login extends Component {
  constructor(...args) {
    super(...args);

    this.state= {
      username: "",
      password: "",
      validated: false
    }
  }
  static propTypes = {
    prop: PropTypes
  }

  handleOnChange(event) {
    this.setState(
      {
        [event.target]: {$set: event.target.value},
      }
    )
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
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
            <Form.Group controlId="formUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control 
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
          <Row className="justify-content-center mt-2">
            <Col xs={12} sm={10} md={8} lg={6}className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Iniciar Sesión
              </Button>
              <span>¿Aún no tienes cuenta? <Link to="/register">Registrate</Link></span>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}
