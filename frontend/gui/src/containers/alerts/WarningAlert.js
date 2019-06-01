import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Container, Row, Col, Alert } from 'react-bootstrap';


class WarningAlert extends Component {
  static propTypes = {
    errorMsg: PropTypes.object,
  }

  render() {
    if(this.props.errorMsg){
      return (
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
              <Alert variant="warning">{Object.values(this.props.errorMsg).map(error => (
                <div key={error}>{error}</div>
              ))}</Alert>
            </Col>
          </Row>
        </Container>
      )
    }else{
      return null
    }
  }
}

const mapStateToProps = state => ({
  errorMsg: state.errors.msg
})

export default connect(mapStateToProps)(WarningAlert)