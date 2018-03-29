import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import marker from '../images/marker.svg'

const AnyReactComponent = ({ img_src }) => <div><img src={img_src} style={{height: '40px'}}/></div>;

export default class Map extends Component {

render() {
    return (
      <div className='google-map' style={{height: '500px', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  "AIzaSyA7J5qanag-cITUdKr3PV55SMrlAM0ACck",
							  language: 'en'}}
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          
          <AnyReactComponent
          lat={this.props.center[0]}
          lng={this.props.center[1]}
          img_src={marker}
		  />

        </GoogleMapReact>
      </div>
    )
  }
}
