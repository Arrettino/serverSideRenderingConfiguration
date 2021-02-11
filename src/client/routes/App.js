import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login';
import Header from '../Layout/Header';
import '../app.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
