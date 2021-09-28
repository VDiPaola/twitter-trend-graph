import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { FormatLineData, Random } from '../Helpers';

const config = {
  labels: ['1', '2', '3', '4', '5', '6'],//dates
  datasets: [
    {
      type: "bar",
      label: 'eth',
      data: [12, 19, 3, 5, 2, 3],//volume
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)',
    }
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default class Chart extends React.Component{
  constructor(props){
    super(props)
    this.state={
      options:options,
      config:config
    }
    
    
  }

  componentDidUpdate(prevProps){
    if(!prevProps.data || prevProps.data.length <= 0){
      if(this.props.data && this.props.data.length > 0){
        let data = FormatLineData(this.props.data, this.props.minuteIncrement)
        let config = this.state.config
        config.labels = data.columns
        config.datasets = []
        for(let obj of data.data){
          let rgb = `rgb(${Random(0,255)}, ${Random(0,255)}, ${Random(0,255)})`
          config.datasets.push({
            label: obj.token,
            data: obj.data,
            fill: false,
            backgroundColor: rgb,
            borderColor: rgb,
          })
        }
        this.setState({config:config})
      }
    }
  }

  render(){
    return(
      <>
        {(this.props.type === "line" && <Line key={this.state.config.labels} data={this.state.config} options={this.state.options} />)
        || (this.props.type === "bar" && <Bar key={this.state.config.labels} data={this.state.config} options={this.state.options} />)
        }
        
      </>
    )
  }
  
}