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
      view: 'customer',
      diplayInfo: false
    };
    this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
    this.handleSubmitTransfer = this.handleSubmitTransfer.bind(this);
  }

  handleSubmitTransfer(transferTo){
    console.log(`Ah yes...successful transferTo: ${transferTo}`)
  }

  handleUpdateAddress(hash) {
    //this.setState({ address: hash['address'], lat: hash['lat'], lon: hash['lon'] })
    this.getPropertyByLatLong(hash.lat, hash.lon).then(res => {
      console.log(res)
      this.setState({
        lat: res.property.latitude,
        lon: res.property.longitude,
        name: res.property.owner_name,
        address: res.property.street_address
      });
    });
  }

  handleTransferOwnership() {

  }

  render() {
    if(this.state.address !== ''){
      var displayInfo =
        <InfoCard
          address={this.state.address}
          lat={this.state.lat}
          lon={this.state.lon}
          address={this.state.address}
          name={this.state.name}
          onSubmit={this.handleSubmitTransfer}
        />
    }else{
      var displayInfo = <p>Search for a home...</p>
    }

    if(this.state.view === 'customer'){
      const renderView =
        <div className="wrapper">
          <div className="nav">
            <div className="topnav">
              <a className="active" href="#home">HomeLnk</a>
            </div>
          </div>
          <div className="one">
            <MapWithASearchBox onUpdatePlace={this.handleUpdateAddress}/>
          </div>
          <div className="two">
            {displayInfo}
          </div>
        </div>
    }else{
      const renderView =
      <h1>Customer View</h1>

    }
    console.log(this.state.view)
    if(this.state.view === 'customer'){
      var mapLayout = 'three'
      var infoLayout = 'four'
    } else {
      var mapLayout = 'one'
      var infoLayout = 'two'
    }


    return (
      <div className="wrapper">
        <div className="nav">
          <div className="topnav">
            <a className="active" href="#home">HomeLnk</a>
          </div>
        </div>
        <div className={mapLayout}>
          <MapWithASearchBox onUpdatePlace={this.handleUpdateAddress}/>
        </div>
        <div className={infoLayout}>
          {displayInfo}
        </div>
      </div>
    );
  }
}

export default App;
