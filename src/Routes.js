import { Route } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class Routes extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </>
    );
  }
}

export default Routes;
