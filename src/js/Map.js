import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

export default class Map extends Component {
  static defaultProps = {
    center: { lat: 40.7446790, lng: -73.9485420 },
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
            lat={ 40.7473310 }
            lng={ -73.8517440 }
            text={ 'Test' }
          />
        </GoogleMapReact>
      </div>
    )
  }
}
