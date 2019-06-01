import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import TableTournaments from '../../components/TableTournaments'
import { returnErrors } from '../../store/actions/errors';


class TournamentsUser extends Component {
  constructor(props) {
    super(props);

    this.state= {
      torneos: [],
    }

    let config = {
      headers: {
        'Authorization': `Token ${this.props.token}`
      }
    };
    
    axios.get('http://127.0.0.1:8000/api/torneos/usuario', config)
      .then(res => {
        this.setState({
          torneos: res.data,
        });
      })
      .catch(err => this.props.returnErrors(err))
  }

  static propTypes = {
    token: PropTypes.string.isRequired,
    returnErrors: PropTypes.func.isRequired,
  }

  render() {
    const Torneos = (
      <TableTournaments torneos={this.state.torneos} />
    )

    const SinTorneo = (
      <span>¡Vaya! Parece que no tienes ningún torneo.</span>
    )

    return (
      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9}><h3>Tus torneos:</h3></Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={9} >
            {this.state.torneos.length !== 0 ? Torneos : SinTorneo}
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
})

export default connect(mapStateToProps, {returnErrors})(TournamentsUser);