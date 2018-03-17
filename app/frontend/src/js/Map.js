import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

export default class Map extends Component {
  static defaultProps = {
    center: { lat: 30.2672, lng: -97.7431 },
    zoom: 11
  }

render() {
    return (
      <div className='google-map' style={{height: '500px', width: '500px'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  "AIzaSyA7J5qanag-cITUdKr3PV55SMrlAM0ACck",
							  language: 'en'}}
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>
          <AnyReactComponent
            lat={ 30.2672 }
            lng={ -97.7431 }
            text={ 'Test' }
          />
        </GoogleMapReact>
      </div>
    )
  }
}
