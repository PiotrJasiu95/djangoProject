import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';
import Dashboard from './menu/Dashboard';
import { Provider } from 'react-redux';
import store from "../store";
import MainPage from './MainPage'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


const App = ()=>{

        return (
            <Provider store={store}>
            <Router>
               <MainPage/>
            </Router>
            </Provider>
        )

}


ReactDOM.render(<App />, document.getElementById('app'));