import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline, Polygon } from 'react-google-maps';

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
        )
      })
    }



    renderNames() {
      return (
        <h2>{this.state.regions.map(region =>  region.name)}</h2>
      )

    }


    renderRegions(){
        return this.state.regions.map(regionJ => {
          let region = JSON.parse(regionJ.geoJSON)
          let coordinates = region.geometry.coordinates[0][0]
          let coordArr = []
          coordinates.map(coordinate => coordArr.push({lat:coordinate[1], lng:coordinate[0]} ))
          console.log('cord arr', coordArr)
          return (
            <Polygon
            path={coordArr}
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
          />
        )
        });
    }

  render() {
    let pathCoordinates = this.state.latLong
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.7831, lng: -73.9712 } }
        defaultZoom = { 13 }
        >
          <Polyline
            name='THISONE'
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
          {this.renderRegions()}
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
