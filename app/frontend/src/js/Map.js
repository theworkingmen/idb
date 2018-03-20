import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'

const AnyReactComponent = ({ text }) => <div>{ text }</div>;

export default class Map extends Component {

render() {
    return (
      <div className='google-map' style={{height: '500px', width: '100%'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  "AIzaSyA7J5qanag-cITUdKr3PV55SMrlAM0ACck",
							  language: 'en'}}
          defaultCenter={ this.props.center }
          defaultZoom={ this.props.zoom }>

        </GoogleMapReact>
      </div>
    )
  }
}
