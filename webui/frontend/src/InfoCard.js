import React, { Component } from 'react';
import './App.css';

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderForm: false,
      transferTo: ''
    };
    this.handleChangeRenderForm = this.handleChangeRenderForm.bind(this);
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

  handleChangeRenderForm(event) {
    event.preventDefault();
    this.setState({ renderForm: !this.state.renderForm })
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
    return (
      <div className="blog-card">
      	<div className="description">
      		<h2>{this.props.address}</h2>
          <p>
            <b>{this.props.name}</b><br/>
            {this.props.address}<br/>
            {this.props.lat},{this.props.lon}
          </p>
          <ul>
            <li>Date: 01/01/2017, Transfered To: Ryan Stantz, Purchase Price: $135,000</li>
            <li>Date: 01/01/2017, Transfered To: Ryan Stantz, Purchase Price: $135,000</li>
            <li>Date: 01/01/2017, Transfered To: Ryan Stantz, Purchase Price: $135,000</li>
          </ul>
          <br/>
          {form}
          <a href="#" onClick={this.handleChangeRenderForm}>Pass Ownership</a>
      	</div>
      </div>
    )
  }
}

export default InfoCard;
