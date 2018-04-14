import React, { Component } from 'react';
import './App.css';
import MapWithASearchBox from './MapWithASearchBox'
import InfoCard from './InfoCard'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: '',
      lon: '',
      diplayInfo: false
    };
    this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
  }

  handleUpdateAddress(hash) {
    this.setState({ address: hash['address'], lat: hash['lat'], lon: hash['lon'] })
  }

  render() {
    if(this.state.displayInfo){
      var displayInfo = <InfoCard />
    }
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="App-intro">
          <MapWithASearchBox onUpdatePlace={this.handleUpdateAddress}/>
        </div>
      </div>
    );
  }
}

export default App;
