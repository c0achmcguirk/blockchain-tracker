import React, { Component } from 'react';
import './App.css';

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renderForm: false,
      transferTo: '',
      saved: false
    };
    this.handleChangeRenderForm = this.handleChangeRenderForm.bind(this);
    this.handleTransferTo = this.handleTransferTo.bind(this);
    this.handleUpdateSave = this.handleUpdateSave.bind(this);
  }

  handleUpdateSave(event){
    event.preventDefault()
    this.setState({ saved: !this.state.saved })
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

    if(this.props.view === 'customer'){
      if(this.state.saved){
        var renderAction = <a href="#" onClick={this.handleUpdateSave}>You already saved this home!</a>
      }else{
        var renderAction = <a href="#" onClick={this.handleUpdateSave}>Save This Home</a>
      }
    }else{
      var renderAction = <a href="#" onClick={this.handleChangeRenderForm}>Pass Ownership</a>
    }
    
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
            <li>Date: 01/01/2017, Transfered To: Ryan Stantz, Purchase Price: $135,000</li>
            <li>Date: 01/01/2017, Transfered To: Ryan Stantz, Purchase Price: $135,000</li>
            <li>Date: 01/01/2017, Transfered To: Ryan Stantz, Purchase Price: $135,000</li>
          </ul>
          <br/>
          {form}
          {renderAction}
      	</div>
      </div>
    )
  }
}

export default InfoCard;
