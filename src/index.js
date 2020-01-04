import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import HomeCompany from './Components/HomeCompany';
import EngProfileDetail from './Components/EngineerProfileDetail';
import CompanyProfile from './Components/CompanyProfile';
import Home from './Components/Home';
import Card from './Components/Card';
import HomeEngineer from './Components/HomeEngineer';
import { Provider } from 'react-redux';
import store2 from "./Redux/store";


const AppWithRoute = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path='/' exact component={App} /> */}
        <Route path='/' exact component={Home} />
        <Route path='/company' exact component={HomeCompany} />
        <Route path='/company/profile' exact component={CompanyProfile} />
        <Route path='/engineer' exact component={HomeEngineer} />
        <Route path='/engineer/profile' exact component={EngProfileDetail} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/card' exact component={Card} />
      </Switch>
    </Router>
  );
};

const AppUsingRedux = () => {
  return (
    <Provider store={store2}>
      <AppWithRoute />
    </Provider>
  );
};

// Main App
ReactDOM.render(<AppUsingRedux />, document.getElementById('root'));

serviceWorker.unregister();
