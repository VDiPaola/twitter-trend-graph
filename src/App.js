import React from 'react';
import './App.css';

//components
import Chart from './Components/Chart';

//helpers
import { StringToDate } from './Helpers.js'

//data
import rawData from './tweets.txt'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data:[],
      minuteIncrement:60
    }
    
  }

  componentDidMount(){
    this.getData()
  }

  getData(){
    //get data and format it then store in array
    fetch(rawData)
      .then(r => r.text())
      .then(text => {
        text = text.trim();
        let data = text.split('\n').map(JSON.parse);
        //convert dates
        data = StringToDate(data)
        this.setState({data:data})
      });
  }

  render(){
    return (
      <div className="App">
        <div id="chartContainer">
          <Chart type="line" data={this.state.data} minuteIncrement={this.state.minuteIncrement}/>
        </div>
      </div>
    )
  }
}
