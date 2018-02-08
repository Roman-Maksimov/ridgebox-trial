import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import store, { history } from 'src/store';
import Main from './main';
import Basket from './basket';
import Product from './product';

export default (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/basket" component={Basket} />
        <Route path="/:id" component={Product} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);
