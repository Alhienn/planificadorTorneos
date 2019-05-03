import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Spinner, Row, Col, Container } from 'react-bootstrap';

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
    isLoading: PropTypes.bool.isRequired,
    username: PropTypes.string,
    password: PropTypes.string,
    remember: PropTypes.bool,
    validated: PropTypes.bool
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
    const loginButton = (
      <Button variant="primary" type="submit">
        Iniciar Sesión
      </Button>
    )

    const loadingButton = (
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="ml-2">Cargando...</span>
        <span className="sr-only">Cargando...</span>
      </Button>
    )

    return (
      <Container fluid>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={e => this.handleOnSubmit(e)}
        >
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
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
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
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
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
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
            <Col xs={12} sm={10} md={8} lg={6} xl={4}className="d-flex justify-content-between">
              {this.props.isLoading ? loadingButton : loginButton}
              <span>¿Aún no tienes cuenta? <Link to="/register">Regístrate</Link></span>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.authReducer.isLoading,
  errorMsg: state.errorReducer.msg
})

export default connect(mapStateToProps, { login })(Login)