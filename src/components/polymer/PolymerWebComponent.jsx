/* import React from 'react';

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

export default PolymerWebComponent */

import React from 'react';
import { connect } from 'react-redux';
import { FORM_CONFIGS } from '../../config/form_config';
import { loadFormData } from '../../actions/appaction';
import PWCInput from '../common/PWCInput';

class PolymerWebComponent extends React.Component {
    constructor() {
      super();
      this.loadData = this.loadData.bind(this);
    }
    loadData() {
      const {dispatch} = this.props;
      dispatch(loadFormData({
        firstname: 'Mark',
        lastname: 'Zuckerberg',
        email: 'mark.zuckerberg@facebook.com',
        password: 'FACEBOOK'
      }))
    }
    render () {
      const {dispatch, formdata} = this.props;
      return <>
        <h1 className="title">
          <label>REACT with POLYMER WEB COMPONENT</label>
          <i className="fa fa-refresh" onClick={this.loadData}></i>
        </h1>
        <div className="register-form">
          <div className="register-form-title">
            <h3>Sing Up</h3>
            <h5>It's Free and only takes a mints</h5>
          </div>
          {
            FORM_CONFIGS.map(item => {
              return <div className="form-control" key={item.name}>
                <div className="label"><label>{item.label}</label></div>
                <PWCInput
                  name={item.name}
                  value={formdata[item.name]}
                  type={item.type}
                  dispatch={dispatch}
                />
              </div>
            })
          }
          <div>
            <br/>
            <a href="#/result"><button className="btn btn-primary signup-btn">Join Now</button></a>
          </div>
        </div>
      </>
    }
}

// export default HTMLWebcomponent;
const mapStateToProps = (state) => {
  return {
    formdata: state.appdata.formdata
  }
}

export default connect(mapStateToProps)(PolymerWebComponent);