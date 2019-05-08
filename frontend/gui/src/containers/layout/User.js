import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EditField from '../../components/EditField'

class User extends Component {
  constructor(props) {
    super(props);

    this.state= {
      username: this.props.user.username,
    }
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  handleOnChange(event) {
    this.setState(
      {
        [event.target.name] : event.target.value,
      }
    )
  }

  render() {
    return (
      <div>
        <h1>{this.props.user.username}</h1>
        <EditField
          name="username"
          value={this.state.username}
          type="text"
          onChange={e => this.handleOnChange(e)}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authReducer.user,
})

export default connect(mapStateToProps)(User);