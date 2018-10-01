import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polyline } from 'react-google-maps';
import {Fetches} from '../APIs/fetches'
class Map extends Component {
  state = {
    regions : []
  }
  componentDidMount() {

    let UpperWest = this.state.regions
    console.log(this.state.regions[31])

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
      let region1 = this.state.regions[31]
      let geoJ = this.state.regions[31].geoJSON

      let jObject = JSON.parse(geoJ)


      console.log('geoJ: ', jObject.geometry.coordinates[0][0][0])
      let coordArr = []
      jObject.geometry.coordinates[0][0].map(coordinate => coordArr.push({lat:coordinate[0], lng:coordinate[1]}))
      console.log('coordArr:', coordArr[0])

      return coordArr

    }

  render() {
    console.log('convertHash', ()=>this.convertHash())
    let pathCoordinates = [{lat: 37.772, lng: -122.214},
          {lat: 21.291, lng: -157.821},
          {lat: -18.142, lng: 178.431},
          {lat: -27.467, lng: 153.027}]
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {  {lat: 40.758896, lng: -73.985130} }
        defaultZoom = { 12 }
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
