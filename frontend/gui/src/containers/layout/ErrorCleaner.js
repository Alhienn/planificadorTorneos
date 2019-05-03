import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {clearErrors } from '../../store/actions/errors'

//componente para eliminar errores

class AppContainer extends Component {
  static propTypes = {
    clearErrors : PropTypes.func.isRequired
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.clearErrors();
    });
  }

  render() {
     return (
         <Fragment>{this.props.children}</Fragment>
      );
  }
}

export default withRouter(connect(null, { clearErrors })(AppContainer))