import React, { Component } from 'react';
import './App.css';

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderForm: false,
      transferTo: '',
      buttonState: 'enabled'
    };
    this.submitPassOwnership = this.submitPassOwnership.bind(this);
    this.handleTransferTo = this.handleTransferTo.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('YESSS')
    this.props.onSubmit(this.state.transferTo)
    this.setState({ transferTo: '', renderForm: false })
  }

  handleTransferTo(event) {
    this.setState({ transferTo: event.target.value })
  }

  submitPassOwnership(event) {
    event.preventDefault();
    // this.setState({ renderForm: !this.state.renderForm })
    this.props.onSubmitTransfer(2).then(res => {
      // this.props.name = this.props.offer.offerer_name
      // this.props.offer = { offerer_name: 'No pending offers' };
      this.props.onUpdateAfterTransfer(this.props.offer.offerer_name, 'No pending offers')
      this.setState({ buttonState: 'disabled'});
    })
  }

  render() {
    var form;
    if(this.state.renderForm){
      form =
        <form>
          <label>Transfer To:</label>
          <input type="text" onChange={this.handleTransferTo}/>
          <input type="submit" value="Submit" onClick={(e) => this.handleSubmit(e)}/>
        </form>
    }
    var historyOrOffer;
    var header;
    var dollar = this.props.offer.price !== '' ? '$' : '';
    if(this.props.view === 'customer') {
      header = (<div className="history-header">Property History</div>)
      historyOrOffer = this.props.history.map((event, index) => {
        return (<div key={index}>
          <p>{event.date} {event.owner_name} ${event.price}</p>
        </div>)
      });
    } else {
      header = (<div className="history-header">Pending Transfer</div>)
      historyOrOffer = (<div>
        <p>{this.props.offer.offerer_name} {dollar}{this.props.offer.price}</p>
      </div>)
    }

    const buttonStyle = {
      backgroundColor: '#50ae54',
      padding: '8px',
      color: '#fff',
      textDecoration: 'none'
    }

    var button;
    if(this.props.view === 'customer') {
      button = (<span></span>);
    } else {
      if(this.state.buttonState === 'enabled') {
        button = (<a href="#" onClick={this.submitPassOwnership} style={buttonStyle}>Transfer Ownership</a>);
      } else {
        button = (<a href="#" onClick={this.submitPassOwnership} style={buttonStyle} disabled>Transfer Ownership</a>);
      }
    }

    return (
      <div className="blog-card">
      	<div className="description">
      		<h2 className="property-header">{this.props.address}</h2>
          <p>
            <b>{this.props.name}</b><br/>
            {this.props.address}<br/>
          </p>
          <div className="property-history">
            { header}
            { historyOrOffer }
          </div>
          <br/>
          {form}
            {button}
      	</div>
      </div>
    )
  }
}

export default InfoCard;
