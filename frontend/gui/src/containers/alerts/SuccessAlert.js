import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Container, Row, Col, Alert } from 'react-bootstrap';


class SuccessAlert extends Component {
  static propTypes = {
    successMsg: PropTypes.object,
  }

  render() {
    if(this.props.successMsg){
      return (
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
              <Alert variant="success">{this.props.successMsg}</Alert>
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
  successMsg: state.success.msg
})

export default connect(mapStateToProps)(SuccessAlert)