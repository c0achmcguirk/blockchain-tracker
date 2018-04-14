import React, { Component } from 'react';
import './App.css';
import MapWithASearchBox from './MapWithASearchBox';
import InfoCard from './InfoCard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: '',
      lon: '',
      placeId: ''
    };
    this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    // this code is in backend.js
    const response = await fetch('/api/hello');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleUpdateAddress(hash) {
    this.setState({
      address: hash['address'],
      lat: hash['lat'],
      lon: hash['lon'],
      placeId: hash['placeId'],
      zoom: 25
    })
  }

  render() {
    if(this.state.address !== ''){
      var displayInfo = <InfoCard address={this.state.address} />
    }
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className="apiResponse">
          The response from the API call: {this.state.response}
        </div>
        <div className="App-intro">
          <MapWithASearchBox onUpdatePlace={this.handleUpdateAddress}/>
          {displayInfo}
        </div>
      </div>
    );
  }
}

export default App;
