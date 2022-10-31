import React from 'react';
import { connect } from 'react-redux';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <Routes />
    );
  }
}

export default connect()(App);
