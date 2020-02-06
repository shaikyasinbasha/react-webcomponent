import React from 'react';
import { updateFieldValue } from '../../actions/appaction';

class PWCInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      value: props.value,
      type: props.type
    };
    this.updateFieldValue = this.updateFieldValue.bind(this);
  }
  static getDerivedStateFromProps(props, state) {
    return state;
  }
  componentDidMount() {
    this.textInput.addEventListener('poly-input-keyup', this.updateFieldValue);
  }
  updateFieldValue(event) {
    this.props.dispatch(updateFieldValue({
        name: this.state.name,
        value: event.detail.value
    }))
  }
  render() {
    const {name, value, type} = this.props;
    return <>
      <input-lit-element 
        ref={(input) => { this.textInput = input; }}
        name={name}
        value={value}
        type={type}
      />
    </>
  }
}

export default PWCInput;