import React from 'react';
import { connect } from 'react-redux';
import CWCInput from '../common/CWCInput';
import { FORM_CONFIGS } from '../../config/form_config';
import { loadFormData } from '../../actions/appaction';

class ResultComponent extends React.Component {
    constructor() {
      super();
    }
    render () {
      const {dispatch, formdata} = this.props;
      return <>
        <h1 className="title">
          <label>REACT with HTML WEB COMPONENT</label>
        </h1>
        <div className="register-form">
          <div className="register-form-title">
            <h3>RESULT</h3>
          </div>
          {
            FORM_CONFIGS.map(item => {
              return <div className="form-control" key={item.name}>
                <div className="label"><label>{item.label}</label>: <label><b>{formdata[item.name]}</b></label></div>
              </div>
            })
          }
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

export default connect(mapStateToProps)(ResultComponent);