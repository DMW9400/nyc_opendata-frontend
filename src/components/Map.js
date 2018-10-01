import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';

class Map extends Component {
  state = {
    regions : [],
    latLong: null
  }
  componentDidMount() {
    fetch('http://localhost:3000/regions')
    .then(res => res.json())
    .then((resJson) => {
        this.setState({
          regions: resJson
        }
        , () => this.convertHash()
        )
      })
    }

    convertHash = () => {
      let coordArr = []
      if (this.state.regions){
        let geoJ = this.state.regions[31].geoJSON

        let jObject = JSON.parse(geoJ)


        jObject.geometry.coordinates[0][0].map(coordinate => coordArr.push({lat:coordinate[1], lng:coordinate[0]}))

        this.setState({latLong: coordArr})

      }
      return coordArr
    }


    renderNames = () => {
      let pathCoordinates = [{lat:40.7831, lng: -73.9712},
        {lat:50.1, lng:1.1}]
      if (this.state.latLong){
        console.log('renderNames', this.state.latLong[0])
        let otherArr = []
        otherArr.push(this.state.latLong[0])
        otherArr.push(this.state.latLong[1])
        console.log('Arr' ,otherArr)
        return <Polyline
          path={{lat: 40.806707, lng: -73.964849}}
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
      }
    }

  render() {
    let pathCoordinates = this.state.latLong
    const GoogleMapExample = withGoogleMap(props => (

      <GoogleMap
        defaultCenter = { { lat: 40.7831, lng: -73.9712 } }
        defaultZoom = { 13 }
        >
          <Polyline
            path={pathCoordinates}
            options={{
            strokeColor: '#fc1e0d',
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
        {/* {this.renderNames()} */}
        </GoogleMap>
      ));
      return(
        <div>
          <GoogleMapExample
            containerElement={ <div style={{ height: `800px`, width: '900px'}} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
          />
          {this.renderNames()}
        </div>
      );
    }
  };
  export default Map;
