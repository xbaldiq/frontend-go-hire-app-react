import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import Card from './Components/Card';
import App from './App';

// test pagination
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";


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

const theme = createMuiTheme();

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }

  handleClick(offset) {
    this.setState({ offset });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Pagination
          limit={2}
          offset={this.state.offset}
          total={5}
          onClick={(e, offset) => this.handleClick(offset)}
        />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<AppWithRoute />, document.getElementById('root'));
// ReactDOM.render(<Example />, document.getElementById('root'));

serviceWorker.unregister();
