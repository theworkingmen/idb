import React, {
    Component
} from 'react';
import {
    Jumbotron
} from 'react-bootstrap';

export default class notFound extends Component {


    render() {
        return (
            <div className="container">
          <center>
          <Jumbotron> 
            <h1> Error 404 </h1> 
            <p> this is not the page you're looking for... </p>
          </Jumbotron>
          </center>
        </div>

        )
    }
}