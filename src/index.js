import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import HomeCompany from './Components/HomeCompany';
import EngProfileDetail from './Components/EngineerProfileDetail';
import Home from './Components/Home';
import Card from './Components/Card';
import HomeEngineer from './Components/HomeEngineer';
import { Provider } from 'react-redux';
// import store from "./Redux/store";
import { createStore } from 'redux';
import store2 from "./Redux/store";

// REDUX SETUP
// Init state
// const globalState = {
//   // engProject: [],
//   engProject: [
//     { project: 'Vue', company: 'unilever1', status: 'failed' }
//     // ,{"project":"React Native Redux","company":"unilever1","status":"success"},{"project":"React Native Firebase","company":"unilever1","status":"failed"},{"project":"Chat App","company":"lippogroup1","status":"success"}
//   ],
//   value: 5
// };
// Reducer
// const rootReducer = (state = globalState, action) => {
//   // switch (action.type) {
//   //   case 'ENG_GET_PROJECT_LIST':{
//   //     console.log('masuk get eng')
//   //     return {
//   //       ...state,
//   //       engReceivedProject: {
//   //         project: 'React Native Redux',
//   //         company: 'unilever1',
//   //         status: 'success'
//   //       }
//   //     };
//   //   }
//   //   case 'ADD_VALUE':{
//   //     console.log('add value')
//   //     return {
//   //       ...state,
//   //       value: state.value + 1
//   //     }
//   //   }
//   //   default:
//   //     return state;
//   // }

//   if (action.type === 'ENG_GET_PROJECT_LIST') {
//     return {
//       ...state,
//       engReceivedProject: state.engProject.push({
//         project: 'React Native Redux',
//         company: 'unilever1',
//         status: 'success'
//       })
//     };
//   }
//   if (action.type === 'INCREMENT_VALUE') {
//     return {
//       ...state,
//       value: state.value + 1
//     };
//   } else {
//     return state;
//   }
// };
// Store
// const store = createStore(rootReducer);

const AppWithRoute = () => {
  return (
    <Router>
      <Switch>
        {/* <Route path='/' exact component={App} /> */}
        <Route path='/' exact component={Home} />
        <Route path='/home' exact component={HomeCompany} />
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
