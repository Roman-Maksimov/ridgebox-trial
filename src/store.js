import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import reducers from 'src/reducers';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const initialState = window.initialState;

const store = createStore(
  combineReducers({
    ...reducers,
    form: formReducer,
    router: routerReducer,
  }),
  initialState,
  applyMiddleware(
    routerMiddleware(history),
    thunk
  )
);

export default store;
