import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Login2 from './Components/Login2';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Card from './Components/Card';
import App from './App';

const AppWithRoute = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path='/' exact component={App} /> */}
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/card' exact component={Card} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<AppWithRoute />, document.getElementById('root'));

serviceWorker.unregister();
