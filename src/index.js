import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import HomeCompany from './Components/HomeCompany';
import Home from './Components/Home';
import Card from './Components/Card';

import App from './App';
import HomeEngineer from './Components/HomeEngineer';

const AppWithRoute = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path='/' exact component={App} /> */}
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={HomeCompany} />
        <Route path='/engineer' exact component={HomeEngineer} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/card' exact component={Card} />
      </Switch>
    </Router>
  );
};

// Main App
ReactDOM.render(<AppWithRoute />, document.getElementById('root'));


// Testing App
// ReactDOM.render(<AppWithRoute />, document.getElementById('root'));
// ReactDOM.render(<Card />, document.getElementById('root'));
// ReactDOM.render(<CardRemastered/>, document.getElementById('root'));
// ReactDOM.render(<Example />, document.getElementById('root'));

serviceWorker.unregister();
