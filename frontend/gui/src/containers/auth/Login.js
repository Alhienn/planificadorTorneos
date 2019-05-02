import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

export default class Login extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <Container>
        <Form>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
            <Form.Group controlId="formUser">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" required/>
            </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" required minlenght="8"/>
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
