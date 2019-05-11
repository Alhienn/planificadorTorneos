import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import EditField from '../../components/EditField';
import LoadingButton from '../../components/LoadingButton';
import { updateUser } from '../../store/actions/auth';

class User extends Component {
  constructor(props) {
    super(props);

    this.state= {
      username: this.props.user.username,
      email: this.props.user.email
    }
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired,
    errorMsg: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
  }

  
  componentWillUpdate(prevProps) {
    if (this.props.errorMsg !== prevProps.errorMsg){
      this.setState({
        username: this.props.user.username,
        email: this.props.user.email
      })
    }
  }

  handleOnChange(event) {
    this.setState(
      {
        [event.target.name] : event.target.value,
      }
    )
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      this.props.updateUser(this.state.username,this.state.email)
    }
  }

  render() {
    const updateButton = (
      <Button size="sm" variant="primary" type="submit">
        Actualizar datos
      </Button>
    )

    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={4} ><h3>Tus datos:</h3></Col>
        </Row>
        <Form
          validated
          onSubmit={e => this.handleOnSubmit(e)}
        >
          <Form.Group as={Row} controlId="formUsername" className="justify-content-sm-center">
            <Form.Label column xs={12} sm={2} md={1}className="font-weight-bold">Usuario:</Form.Label>
            <Col sm={8} md={7} lg={5} xl={3}>
              <EditField
                name="username"
                value={this.state.username}
                type="text"
                required
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Introduce tu nombre de usuario.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group  as={Row} controlId="formEmail" className="justify-content-center">
            <Form.Label column xs={12} sm={2} md={1} className="font-weight-bold">Email:</Form.Label>
            <Col sm={8} md={7} lg={5} xl={3}>
              <EditField
                name="email"
                value={this.state.email}
                type="email"
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Introduce un email válido.
              </Form.Control.Feedback>
            </Col>
          </ Form.Group>
          <Row className="mt-4 justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
              {this.props.isLoading ? (<LoadingButton size="sm"/>) : updateButton}
              <LinkContainer to="/changePassword">
                <Button className="ml-3" size="sm" variant="primary">Cambiar Contraseña</Button>
              </LinkContainer>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errorMsg: state.errors.msg,
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { updateUser })(User);