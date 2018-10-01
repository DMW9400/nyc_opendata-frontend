import React, { Component } from 'react';
import Map from './components/Map'
import logo from './logo.svg';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <GoogleMapsContainer></GoogleMapsContainer> */}
        <Map></Map>
      </div>
    );
  }
}

export default App;
