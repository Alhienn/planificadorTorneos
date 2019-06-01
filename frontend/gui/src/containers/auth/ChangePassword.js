import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'

import LoadingButton from '../../components/LoadingButton'
import { updatePassword } from '../../store/actions/auth'

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state= {
      originalPassword: "",
      password: "",
      password2: "",
      validated: false
    }
  }

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    updatePassword: PropTypes.func.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoading !== prevProps.isLoading){
      this.setState({
        validated: false
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
      this.props.updatePassword(this.state.originalPassword,this.state.password)
    }
    this.setState({ validated: true });
  }

  render() {
    const updateButton = (
      <Button size="sm" variant="primary" type="submit">
        Cambiar contraseña
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
              <Form.Group controlId="formOriginalPassword">
                <Form.Label>Contraseña antigua</Form.Label>
                <Form.Control
                  name="originalPassword"
                  type="password"
                  required 
                  pattern=".{8,}"
                  value={this.state.originalPassword}
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
              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña nueva</Form.Label>
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
                <Form.Label>Repite la contraseña nueva</Form.Label>
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
          <Row className="justify-content-center mt-2">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}className="d-flex justify-content-end">
            {this.props.isLoading ? (<LoadingButton />) : updateButton}
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, { updatePassword })(ChangePassword)