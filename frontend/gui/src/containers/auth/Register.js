import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap';

import LoadingButton from '../../components/LoadingButton';

import { register } from '../../store/actions/auth';

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
    isLoading: PropTypes.bool.isRequired,
    errorMsg: PropTypes.object,
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
    const registerButton = (
      <Button variant="primary" type="submit">
        Registrarse
      </Button>
    )

    return (
      <Container fluid>
        {this.props.errorMsg && (
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
              <Alert variant="warning">{Object.values(this.props.errorMsg)}</Alert>
            </Col>
          </Row>
        )}
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={e => this.handleOnSubmit(e)}
        >
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
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
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
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
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
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
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
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
            {this.props.isLoading ? (<LoadingButton />) : registerButton}
              <span>¿Ya tienes cuenta? <Link to="/register">Inicia sesión</Link></span>
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

export default connect(mapStateToProps, { register })(Register)
