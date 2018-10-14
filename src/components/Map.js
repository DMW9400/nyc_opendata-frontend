import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Polygon } from 'react-google-maps';
import Select from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const selectStyle = {
  width: '70%',
  backgroundColor: '#B0BEC5',
}
const menuItem = {
  color:'#263238',
  backgroundColor:'#B0BEC5'
}

const textColor = {
  color: '#795548'
}

class Map extends Component {
  state = {
    regions : [],
    latLong: null,
    metrics:[],
    metricNames:null,
    selectedMetric: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/regions')
      .then(res => res.json())
      .then((resJson) => {
        this.setState({
          regions: resJson
        })
      });
    fetch('http://localhost:3000/metrics')
      .then(res => res.json())
      .then ((metJson) => {
        this.setState({
          metrics: metJson
        })
      });
    }

    generateMetricNames(){
      let metricNames = []
      if (this.state.metrics.length > 0){
        this.state.metrics.map (metric => {
          if (!metricNames.includes(metric.name)) {
            metricNames.push(metric.name)
          }
        });
      }
      return metricNames
    }

    metricItems (values) {
      let metricNames = this.generateMetricNames()
      let metricID = -1

      return metricNames.map((metric) => {
        metricID++
        return <MenuItem
          key={metricID}
          insetChildren={true}
          checked={values && values.indexOf(metric) > -1}
          value={metric}
          primaryText={metric}
        >
        </MenuItem>

      });
    }

    handleMetricSelect = (event, index, clickedMetric) => {
      // event.preventDefault()
      this.setState(
        {
          selectedMetric: clickedMetric
        }, ()=>console.log(this.state)
      )

    }

    renderRegions(){
        let polyID = 0
        return this.state.regions.map (regionJ => {
          let region = JSON.parse(regionJ.geoJSON)
          let coordinates = region.geometry.coordinates[0][0]
          let coordArr = []
          polyID++
          coordinates.map(coordinate => coordArr.push({lat:coordinate[1], lng:coordinate[0]} ))
          return (
            <Polygon
              key={polyID}
              path={coordArr}
              options={{
                strokeColor: '#fc1e0d',
                strokeOpacity: 1,
                strokeWeight: 2,
                // fillColor: '#fc1e0d',
                fillColor: ['RGB', 12,108,15],
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
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: 40.7831, lng: -73.9712 } }
        defaultZoom = { 13 }
        >
          {this.renderRegions()}
        </GoogleMap>
      ));

      const metrics = this.state.metrics

      return(
        <div>
          <GoogleMapExample
            containerElement={ <div style={{ height: `800px`, width: '900px'}} /> }
            mapElement={ <div style={{ height: `100%` }} /> }
          />
          <Select
            name='metricSelect'
            menuItemStyle = {menuItem}
            labelStyle={textColor}
            selectedMenuItemStyle={textColor}
            style={selectStyle}
            multiple={false}
            hintText="Select a Metric"
            onChange={this.handleMetricSelect}
            // value={metrics}
            >
              {this.metricItems()}
          </Select>

        </div>
      );
    }
  };
  export default Map;
