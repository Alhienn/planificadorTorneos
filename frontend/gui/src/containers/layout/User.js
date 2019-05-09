import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

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
    isLoading: PropTypes.bool.isRequired,
    updateUser: PropTypes.func.isRequired,
    errorMsg: PropTypes.object
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
      <Container>
        {this.props.errorMsg && (
          <Row>
            <Col xs={9} sm={8} md={7} lg={6} xl={4}>
              <Alert variant="warning">{Object.values(this.props.errorMsg)}</Alert>
            </Col>
          </Row>
        )}
        <Row><h3>Tus datos:</h3></Row>
        <Form
          validated
          onSubmit={e => this.handleOnSubmit(e)}
        >
          <Row>
            <Col sm={4} md={3} xl={2} xs={12} className="mt-2 font-weight-bold">Nombre de usuario:</Col>
            <Col sm={6} md={4}>
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
          </Row>
          <Row>
            <Col sm={4} md={3} xl={2} xs={12} className="mt-2 font-weight-bold">Email:</Col>
            <Col sm={6} md={4}>
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
          </Row>
          <Row className="mt-4" >
            <Col xs={5} md={4} lg={3}>
              <Button size="sm" variant="primary">Cambiar Contraseña</Button>
            </Col>
            <Col xs={5} md={4} lg={3}>
              {this.props.isLoading ? (<LoadingButton size="sm"/>) : updateButton}
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
  isLoading: state.authReducer.isLoading,
  errorMsg: state.errorReducer.msg
})

export default connect(mapStateToProps, { updateUser })(User);