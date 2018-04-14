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
      		<p className="summary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
          <br/>
          <a href="#">Pass Ownership</a>
      	</div>
      </div>
    )
  }
}

export default InfoCard;
