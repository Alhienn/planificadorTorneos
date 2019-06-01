import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


export default class TableTournaments extends Component {
  static propTypes = {
    torneos: PropTypes.array.isRequired,
    motrarPropietario: PropTypes.bool
  }

  render() {
    return (
      <Table hover striped>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Creado</th>
            <th>Actualizado</th>
            {this.props.mostrarPropietario && (
              <th>Propietario</th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.torneos.map( torneo => (
            <LinkContainer key={torneo.id} to={`/tournament/${torneo.id}/enfrentamientos`}>
              <tr>
                <td>{torneo.nombre}</td>
                <td>{torneo.creado}</td>
                <td>{torneo.actualizado}</td>
                {this.props.mostrarPropietario && (
                  <td>{torneo.usuario.username}</td>
                )}
              </tr>
            </LinkContainer>
          ))}
        </tbody>
      </Table>
    )
  }
}
