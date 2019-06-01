import React, { Component , Fragment} from 'react'
import { Container, Row, Col,  Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Clasificacion extends Component {
  constructor(props) {
    super(props);

    this.state= {
      nombre: "",
      equipos: [],
      existe: true
    }

    const torneoID = this.props.match.params.torneoID
    axios.get(`http://127.0.0.1:8000/api/torneo/${torneoID}/clasificacion`)
      .then(res => {
        this.setState({
          nombre: res.data.nombre,
          equipos: res.data.equipos
        });
      })
      .catch(err => {
        this.setState({
          existe: false
        });
      })
  }

  render() {
    const clasificacion = (
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9} ><h3>{this.state.nombre}</h3></Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9} >
            <Table striped>
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Equipo</th>
                  <th>Jugados</th>
                  <th>Ganados</th>
                  <th>Empatados</th>
                  <th>Perdidos</th>
                  <th>A favor</th>
                  <th>En contra</th>
                  <th>Diferencia</th>
                  <th>Puntos</th>
                </tr>
              </thead>
              <tbody>
                {this.state.equipos.map( (equipo, posicion) => (
                  <tr key={equipo.id}>
                    <td>{posicion+1}</td>
                    <td>{equipo.nombre}</td>
                    <td align="center">{equipo.partidos_jugados}</td>
                    <td align="center">{equipo.partidos_ganados}</td>
                    <td align="center">{equipo.partidos_empatados}</td>
                    <td align="center">{equipo.partidos_perdidos}</td>
                    <td align="center">{equipo.a_favor}</td>
                    <td align="center">{equipo.en_contra}</td>
                    <td align="center">{equipo.diferencia}</td>
                    <td align="center">{equipo.puntos}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9} className="d-flex justify-content-end" >
            <h6>Ir a <Link to={`/tournament/${this.props.match.params.torneoID}/enfrentamientos`}>enfrentamientos</Link>.</h6>
          </Col>
        </Row>
      </Container>
    )
    return (
      <Fragment>
        {this.state.existe ? clasificacion : (<span/>)}
      </Fragment>
    )
  }
}
