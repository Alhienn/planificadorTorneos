import React, { Component }from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import PublicRoute from './containers/routes/PublicRoute';
import PrivateRoute from './containers/routes/PrivateRoute';
import StateCleaner from './containers/common/StateCleaner';
import WarningAlert from './containers/alerts/WarningAlert';
import SuccessAlert from './containers/alerts/SuccessAlert';
import Header from './containers/layout/Header';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import User from './containers/layout/User';
import TournamentsUser from './containers/tournaments/TournamentsUser';
import Clasificacion from './containers/tournaments/Clasificacion';
import Enfrentamientos from './containers/tournaments/Enfrentamientos';
import CrearTorneo from './containers/tournaments/CrearTorneo';
import Home from './components/Home';
import ChangePassword from './containers/auth/ChangePassword';

import store from './store';
import { loadUser } from './store/actions/auth';

class App extends Component {
  constructor(props) {
    super(props);

    localStorage.getItem('token') && store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store={store}>
        <Router>
          <StateCleaner>
            <Header />
            <WarningAlert />
            <SuccessAlert />
            <Switch>
              <Route exact path="/" component={Home} />
              <PublicRoute exact path="/login" component={Login} />
              <PublicRoute exact path="/register" component={Register} />
              <PrivateRoute exact path="/user" component={User}/>
              <PrivateRoute exact path="/tournaments-user" component={TournamentsUser}/>
              <PrivateRoute exact path="/create-tournament" component={CrearTorneo}/>
              <Route exact path="/tournament/:torneoID/clasificacion" component={Clasificacion} />
              <Route exact path="/tournament/:torneoID/enfrentamientos" component={Enfrentamientos} />
              <PrivateRoute exact path="/changePassword" component={ChangePassword}/>
            </Switch>
            </StateCleaner>
        </Router>
      </Provider>
    );
  }
}

export default App;
