import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = () => <div className="marker"></div>;

class SimpleMap extends Component {

  constructor(props){
    super(props)
    this.state = {
      lat:this.props.LatLong.lat,
      lng:this.props.LatLong.lng
    }
  }

  render() {
    console.log(this.props, this.state)
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCsVx-GvAEBRgFQasy11e_XjlCwYkMpdN4" }}
          defaultCenter={this.state}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={this.props.LatLong.lat}
            lng={this.props.LatLong.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;