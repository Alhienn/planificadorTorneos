import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { clearErrors } from '../../store/actions/errors'
import { clearSuccess } from '../../store/actions/success'

//componente para eliminar errores

class StateCleaner extends Component {
  static propTypes = {
    clearErrors : PropTypes.func.isRequired,
    clearSuccess : PropTypes.func.isRequired
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen(() => {
      this.props.clearErrors();
      this.props.clearSuccess();
    });
  }

  render() {
     return (
         <Fragment>{this.props.children}</Fragment>
      );
  }
}

export default withRouter(connect(null, { clearErrors, clearSuccess })(StateCleaner))