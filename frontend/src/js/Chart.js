import React, {
    Component
} from 'react';
import {
    Doughnut
} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.data
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }

    render() {
        return (
            <div className="chart">
        <Doughnut
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:this.props.titleText,
              fontSize:23,
              fontFamily:"'Comfortaa'",
              fontStyle:300
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
          redraw
        />
      </div>
        )
    }
}

export default Chart;