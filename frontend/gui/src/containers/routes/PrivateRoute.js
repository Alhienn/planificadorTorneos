import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const  PrivateRoute = ({ component: Component , auth, ...rest}) => {
  
  PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
  }

  return (
    <Route
      {...rest}
      render={props => {
        if(!auth.isAuthenticated && !auth.isLoading) {
          return <Redirect to="/login" />
        } else {
          return <Component {...props} />;
        }
      }}
    />
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)