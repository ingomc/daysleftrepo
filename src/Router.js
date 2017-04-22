import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';

import Login from './components/Login';
import Overview from './components/Overview';
import Details from './components/CountdownDetails';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="login" hideNavBar={true} component={Login} title="Laden" initial />
      </Scene>

        <Scene key="main">
          <Scene key="overview" component={Overview} title="Daysleft" initial />
          <Scene key="details" component={Details} title="Details" />
        </Scene>
    </Router>
  );
};

export default RouterComponent;
