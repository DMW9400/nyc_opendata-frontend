import React, { Component } from 'react';
import Map from './components/Map'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Map></Map>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
