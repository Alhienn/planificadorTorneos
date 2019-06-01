import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

import LoadingButton from '../../components/LoadingButton';
import { startLoading, stopLoading } from '../../store/actions/auth';
import { returnErrors } from '../../store/actions/errors';

class CrearTorneo extends Component {
  constructor(props) {
    super(props);

    this.state= {
      nombre: "",
      equipos: [],
      n_equipos: "",
      vuelta: "N",
      validated: false
    }
  }
  static propTypes = {
    token: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    returnErrors: PropTypes.func.isRequired,
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isLoading !== prevProps.isLoading){
      this.setState({
        validated: false
      })
    }
    if (this.state.n_equipos !== prevState.n_equipos){
      let equipos = [];
      for(var i = 0; i < this.state.n_equipos; i++){
        equipos.push({nombre: ""});
      }
      this.setState({
        equipos: equipos
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

  handleOnChangeEquipo(event, index){
    let equipos = this.state.equipos
    equipos[index] = { nombre: event.target.value}
    this.setState({
      equipos: equipos
    })
  }

  handleOnSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    this.setState({
      validated: true
    })
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }else{
      this.props.startLoading();
      const body = {
        nombre: this.state.nombre,
        vuelta: this.state.vuelta,
        equipos: this.state.equipos
      }
      let config = {
        headers: {
          'Authorization': `Token ${this.props.token}`
        }
      };
      axios.post('http://127.0.0.1:8000/api/crearTorneo', body, config)
        .then(res => {
          this.props.stopLoading()
          this.props.history.push(`tournament/${res.data.id}/enfrentamientos`)
        })
        .catch(err => {
          this.props.stopLoading()
          this.props.returnErrors(err);
        })
    }
    this.setState({ validated: true });
  }

  render() {
    const registerButton = (
      <Button variant="primary" type="submit">
        Crear Torneo
      </Button>
    )

    return (
      <Container fluid className="mb-5">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={4}><h3>Crear Torneo:</h3></Col>
        </Row>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={e => this.handleOnSubmit(e)}
        >
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="ml-4">
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre del torneo :</Form.Label>
              <Form.Control
                name="nombre"
                type="text"
                required
                value={this.state.nombre}
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Introduce un nombre para el torneo.
              </Form.Control.Feedback>
            </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="ml-4">
              <Form.Label>Vuelta :</Form.Label>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="ml-4">
              <Form.Check
                id="vueltaN"
                custom
                inline
                name="vuelta"
                type="radio"
                label="No"
                value="N"
                checked={this.state.vuelta==="N"}
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Check
                id="vueltaS"
                inline
                custom
                name="vuelta"
                type="radio"
                label="Simétrica"
                value="S"
                checked={this.state.vuelta==="S"}
                onChange={e => this.handleOnChange(e)}
              />
              <Form.Check
                id="vueltaA"
                custom
                inline
                name="vuelta"
                type="radio"
                label="Asimetrica"
                value="A"
                checked={this.state.vuelta==="A"}
                onChange={e => this.handleOnChange(e)}
              />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mt-3 ml-4 mb-2">
              <Form.Group controlId="formNEquipos">
                <Form.Label>Número de equipos :</Form.Label>
                <Form.Control
                  name="n_equipos"
                  type="number"
                  min="2"
                  step="1"
                  required
                  value={this.state.value}
                  ref={this.formRef}
                  onBlur={this.handleOnBlur}
                  onChange={e => this.handleOnChange(e)}
                />
                <Form.Control.Feedback type="invalid">
                  Introduce un número valido(al menos 2).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {this.state.equipos.map((equipo, index) => (
            <Fragment key={index}>
              <Row className="justify-content-center ml-2">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                  <h6>Equipo {index+1} :</h6>
                </Col>
              </Row>
              <Row className="justify-content-center ml-4">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                <Form.Group controlId={`formNombreEquipo${index+1}`}>
                  <Form.Label>Nombre :</Form.Label>
                  <Form.Control
                    name="nombre"
                    type="text"
                    required
                    value={equipo.nombre}
                    onChange={e => this.handleOnChangeEquipo(e, index)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Introduce un nombre para el equipo {index+1}.
                  </Form.Control.Feedback>
                </Form.Group>
                </Col>
            </Row>
           </Fragment>
          ))}
          <Row className="justify-content-center mt-4">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}className="d-flex justify-content-between">
              {this.props.isLoading ? (<LoadingButton />) : registerButton}
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps , { returnErrors, startLoading, stopLoading })(CrearTorneo)