
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
class Map extends Component {
  state = {
    regions : []
  }
  componentDidMount() {

    fetch('http://localhost:3000/regions')
    .then(res => res.json())
    .then((resJson) => {
        this.setState({
          regions: resJson
          }, ()=>console.log(this.state)
        )
      })
    }

  render() {

    let pathCoordinates = [{lat:40.7831, lng: -73.9712},
      {lat:50.1, lng:1.1}]
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.7831, lng: -73.9712 } }
        defaultZoom = { 13 }
        >
          <Polyline
            path={pathCoordinates}
            options={{
            strokeColor: '#00ffff',
            strokeOpacity: 1,
            strokeWeight: 2,
            icons: [{
              icon: "hello",
              offset: '0',
              repeat: '10px'
            }],
            }}
            draggable = {true}
        />
        </GoogleMap>
      ));
      return(
        <div>
          <GoogleMapExample
            containerElement={ <div style={{ height: `800px`, width: '900px'}} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
          />
        </div>
      );
    }
  };
  export default Map;
