import { LOAD_FORM_DATA, UPDATE_FIELD_VALUE, LOADNG_SPINNER } from "../constants/actions";

const initialState = {
  formdata: {}
};

const appdata = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FORM_DATA: {
      return {...state, formdata: action.data}
    }
    case UPDATE_FIELD_VALUE: {
      // debugger;
      return {
        ...state,
        formdata: {
          ...state.formdata,
          [action.data.name]: action.data.value
        }
      }
    }
    case LOADNG_SPINNER: {
      return {...state, loading: action.data}
    }
    default: 
      return state
  }
};
    
export default appdata;