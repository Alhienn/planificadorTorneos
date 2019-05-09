import React, { Component } from 'react';
import { Button, Spinner } from 'react-bootstrap';

export default class LoadingButton extends Component {
  render() {
    return (
      <Button {...this.props} variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="ml-2">Cargando...</span>
      </Button>
    )
  }
}
