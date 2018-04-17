import React, { Component } from 'react';
import {Image, Col, Thumbnail, Popover, OverlayTrigger} from 'react-bootstrap';


class ToolCard extends Component {

    /* default img src = https://goo.gl/NvPJj6 */

    render() {

    	let centeredTitle = (<center>{this.props.name}</center>);
    	let popoverfocus = ( 	
    		
			<Popover 	id="popover-trigger-hover-focus" 
						style={{margin:"auto"}}
						title={centeredTitle}>
					{this.props.about}
			</Popover>
			
		);

        return (

            <Col xs={12} sm={3} md={3} lg={3}>
                <OverlayTrigger	trigger={['hover', 'focus']}
							    placement="bottom"
							    overlay={popoverfocus}>
                <Thumbnail  style={{height:"13em", width:"13em"}}
                            href ={this.props.src}
                            target="_blank">
                    {/* img src needs to have a {local path} or {url}. DB needs to provide url of img. */}
                    <center>
                        <Image  src={this.props.image}
                                onError={(e)=>{e.target.src="https://goo.gl/NvPJj6"}}
                                style={{width:"10em", height:"10em"}}/>
                    </center>
                    
					
                </Thumbnail>
                </OverlayTrigger>
                
                
            </Col>
        );
    }

}

export default ToolCard;
