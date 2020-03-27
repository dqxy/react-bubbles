import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { createStore, applyMiddleware } from "redux";
import { dataReducer as reducer } from "./reducers/dataReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PrivateRoute  from "./components/PrivateRoute";
import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import "./styles.scss";


const store = createStore(reducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        
        <Switch>
        <PrivateRoute exact path="/protected" component={BubblePage} />
        <Route exact path="/" component={Login} />
        <Route component={Login} />
        </Switch>
        
      </div>
    </Router>
    </Provider>
  );
}

export default App;
