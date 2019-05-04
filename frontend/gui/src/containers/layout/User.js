import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class User extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <h1>{this.props.user.username}</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
})

export default connect(mapStateToProps)(User);