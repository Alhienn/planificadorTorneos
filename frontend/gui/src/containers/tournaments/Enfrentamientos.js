import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Row, Col,  Table } from 'react-bootstrap'
import axios from 'axios'

import MarcadorEditField from './MarcadorEditField'
import { returnErrors } from '../../store/actions/errors';

class Enfrentamientos extends Component {
  constructor(props) {
    super(props);

    this.state= {
      nombre: "",
      rondas: [],
      userId: "",
      existe: true
    }

    const torneoID = this.props.match.params.torneoID
    axios.get(`http://127.0.0.1:8000/api/torneo/${torneoID}/enfrentamientos`)
      .then(res => {
        this.setState({
          nombre: res.data.nombre,
          rondas: res.data.rondas,
          userId: res.data.usuario
        });
      })
      .catch(err => {
        this.setState({
          existe: false
        });
      })
  }

  static propTypes = {
    user: PropTypes.object,
    token: PropTypes.string,
    returnErrors: PropTypes.func.isRequired,
  }

  render() {
    const enfrentamientos = (
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9} ><h3>{this.state.nombre}</h3></Col>
        </Row>
        {this.state.rondas.map( ronda => (
          <Fragment key = {ronda.id}>
            <Row className="justify-content-center">
              <Col xs={12} lg={10} xl={9} ><h5>Ronda {ronda.n_ronda}</h5></Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs={12} lg={10} xl={9} >
                <Table striped>
                  <tbody>
                    {ronda.partidos.map( partido => (
                      <tr key={partido.id}>
                        <td width="22%"><div className="my-2 ml-3 d-flex">{partido.equipo_local}</div></td>
                        <td width="18%">{(this.props.user && (this.state.userId === this.props.user.id)) ? (
                          <MarcadorEditField 
                            local={true}
                            id={partido.id}
                            value={partido.marcador_local}/>
                          ) : (
                            <div className="my-2 ml-3 d-flex">{partido.marcador_local}</div>
                          )}</td>
                        <td width="10%"><div className="my-2 ml-3 d-flex">vs</div></td>
                        <td width="22%"><div className="my-2 ml-3 d-flex">{partido.equipo_visitante}</div></td>
                        <td width="18%">{(this.props.user && (this.state.userId === this.props.user.id)) ? (
                          <MarcadorEditField 
                            local={false}
                            id={partido.id}
                            value={partido.marcador_visitante}/>
                          ) : (
                            <div className="my-2 ml-3 d-flex">{partido.marcador_visitante}</div>
                          )}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Fragment>
        ))}
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9} className="d-flex justify-content-end">
            <h6>Ir a <Link to={`/tournament/${this.props.match.params.torneoID}/clasificacion`}>clasificación</Link>.</h6>
          </Col>
        </Row>
      </Container>
    )
    return (
      <Fragment>
        {this.state.existe ? enfrentamientos : (<span/>)}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
})

export default connect(mapStateToProps, {returnErrors})(Enfrentamientos);