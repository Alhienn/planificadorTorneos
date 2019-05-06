import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import PublicRoute from './containers/routes/PublicRoute';
import PrivateRoute from './containers/routes/PrivateRoute';
import ErrorCleaner from './containers/common/ErrorCleaner';
import Header from './containers/layout/Header';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Home from './components/Home';
import User from './containers/layout/User';

import store from './store';
import { loadUser } from './store/actions/auth';

class App extends Component {

  componentDidMount() {
    localStorage.getItem('token') && store.dispatch(loadUser());
  };

  render(){
    return (
      <Provider store={store}>
        <Router>
          <ErrorCleaner>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
              <PrivateRoute exact path="/user" component={User}/>
            </Switch>
            </ErrorCleaner>
        </Router>
      </Provider>
    );
  }
}

export default App;
