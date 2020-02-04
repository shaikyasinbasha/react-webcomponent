import React from 'react';

class PolymerWebComponent extends React.Component {
  constructor() {
    super();
    this.state = {name: ''};
    this.updateFieldValue = this.updateFieldValue.bind(this);
  }
  componentDidMount() {
    this.textInput.addEventListener('poly-input-keyup', this.updateFieldValue);
  }
  updateFieldValue(event) {
    this.setState({name: event.detail.value})
  }
  render() {
    return <>
      <h1>POLYMER Web Component :: {this.state.name}</h1>
      <input-lit-element ref={(input) => { this.textInput = input; }}></input-lit-element>
    </>
  }
}

export default PolymerWebComponent