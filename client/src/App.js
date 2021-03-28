import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Admin from './components/Admin';
import Dashboard from './components/Dashboard';
import Analsis from './components/Analysis'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';

function App() {
  return (
    <Router>
    <ToastContainer/>
    <div >
      App
      <Switch>
      <Route path="/" exact component={Home}></Route>
        <Route path="/dashboard" exact component={Dashboard}></Route>
        <Route path="/admin" exact component={Admin}></Route>
        <Route path="/analysis/:id" exact component={Analsis}></Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
