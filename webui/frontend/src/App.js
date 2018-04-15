import React, { Component } from 'react';
import './App.css';
import MapWithASearchBox from './MapWithASearchBox';
import InfoCard from './InfoCard';
import homelnk from './homelnk.png'

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
    this.handleToggleView = this.handleToggleView.bind(this);
  }

  handleSubmitTransfer(transferTo){
    console.log(`Ah yes...successful transferTo: ${transferTo}`)
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

  handleTransferOwnership() {

  }

  render() {
    if(this.state.address !== ''){
      var displayInfo =
        <InfoCard
          view={this.state.view}
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
      var mapLayout = 'three'
      var infoLayout = 'four'
      var renderUser = <a className="pull-right" href="#home"><i className="fa fa-user"></i> Kyle Laughlin </a>
    } else {
      var mapLayout = 'one'
      var infoLayout = 'two'
      var renderUser = <a className="pull-right" href="#home"><i className="fa fa-user"></i> Modern Title Company Employee</a>
    }

    return (
      <div className="wrapper">
        <div className="nav">
          <div className="topnav">
            <a className="active" href="#home"><img src={homelnk} width="70" height="20"/></a>
            { renderUser }
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
