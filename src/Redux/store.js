import { createStore, applyMiddleware } from 'redux';
import rpm from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './Reducers/index';

const logger = createLogger();
const enhancers = composeWithDevTools(applyMiddleware(logger, rpm));
const store = createStore(reducers, enhancers);

store.subscribe(() => {
    console.log('state updated')
})
export default store;
