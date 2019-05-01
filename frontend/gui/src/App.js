import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './containers/layout/Header';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register'
import store from './store';

import { loadUser } from './store/actions/auth'

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  };

  render(){
    return (
      <Provider store={store}>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/"/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
