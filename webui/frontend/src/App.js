import React, { Component } from 'react';
import './App.css';
import MapWithASearchBox from './MapWithASearchBox';
import InfoCard from './InfoCard';

class App extends Component {

  componentDidMount() {
    // this.callApi()
    //   .then(res => this.setState({ response: res.express }))
    //   .catch(err => console.log(err));
  }

  callApi = async () => {
    // this code is in backend.js
    const response = await fetch('/api/properties/foobar');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  getPropertyByLatLong = async (lat, lon) => {
    const response = await fetch(`/api/properties?lat=${lat}&lon=${lon}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: '',
      lon: '',
      name: '',
      diplayInfo: false
    };
    this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
  }

  handleUpdateAddress(hash) {
    //this.setState({ address: hash['address'], lat: hash['lat'], lon: hash['lon'] })
    this.getPropertyByLatLong(hash.lat, hash.lon).then(res => {
      this.setState({
        lat: res.property.latitude,
        lon: res.property.longitude,
        name: res.property.name,
        address: hash.address
      });
    });
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
<<<<<<< HEAD
        <div className="two">
          {displayInfo}
=======
        <div className="propertyInfo">
          <p>
            <b>{this.state.name}</b><br/>
            {this.state.address}<br/>
            {this.state.lat},{this.state.lon}
          </p>
>>>>>>> 32935d8dbaf6bf0e50a9d30f4bda94b09d35c1f0
        </div>
      </div>
    );
  }
}

export default App;
