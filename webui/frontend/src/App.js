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
      placeId: hash['placeId']
    })
  }

  render() {
    if(this.state.address !== ''){
      var displayInfo = <InfoCard address={this.state.address} />
    }else{
      var displayInfo = <p>Search for a home...</p>
    }
    return (
      <div className="wrapper">

        <div className="apiResponse">
          The response from the API call: {this.state.response}
        </div>
        <div className="nav">
          <div className="topnav">
            <a className="active" href="#home">Home</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>
        <div className="one">
          <MapWithASearchBox onUpdatePlace={this.handleUpdateAddress}/>
        </div>
        <div className="two">
          {displayInfo}
        </div>
      </div>
    );
  }
}

export default App;
