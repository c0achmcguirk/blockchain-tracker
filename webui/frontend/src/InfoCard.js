import React, { Component } from 'react';
import './App.css';

class InfoCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blog-card">
      	<div className="description">
      		<h2>{this.props.address.replace(", USA", "")}</h2>
          <p>
            <b>{this.props.name}</b><br/>
            {this.props.address}<br/>
            {this.props.lat},{this.props.lon}
          </p>
          <ul>
            <li>Date: 01/01/2017, Transfered From: Don Stantz, To: Ryan Stantz, Purchase Price: $135,000</li>
            <li>Date: 01/01/2017, Transfered From: Don Stantz, To: Ryan Stantz, Purchase Price: $135,000</li>
            <li>Date: 01/01/2017, Transfered From: Don Stantz, To: Ryan Stantz, Purchase Price: $135,000</li>
          </ul>
          <br/>
          <a href="#">Pass Ownership</a>
      	</div>
      </div>
    )
  }
}

export default InfoCard;
