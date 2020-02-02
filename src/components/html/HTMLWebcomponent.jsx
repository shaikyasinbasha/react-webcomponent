import React from 'react';
import { connect } from 'react-redux';
import CWCInput from '../common/CWCInput';
import { FORM_CONFIGS } from '../../config/form_config';
import { loadFormData } from '../../actions/appaction';

class HTMLWebcomponent extends React.Component {
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
          <label>REACT with HTML WEB COMPONENT</label>
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
                <CWCInput
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

export default connect(mapStateToProps)(HTMLWebcomponent);