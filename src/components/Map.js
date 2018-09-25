import React from 'react'

class Map extends React.Component {

  render(){
    return (
      <div>
        <script>
          var map;
          function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: -34.397, lng: 150.644},
              zoom: 8
            })
          }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWYv_s_PYAnPwKl3vIMkqcFihUJHIgATs&callback=initMap"
        async defer></script>
      </div>
    )
  }

}
