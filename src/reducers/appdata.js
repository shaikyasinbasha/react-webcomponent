import { LOAD_FORM_DATA, UPDATE_FIELD_VALUE, LOADNG_SPINNER } from "../constants/actions";

const initialState = {
  formdata: {}
};

const appdata = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FORM_DATA: {
      //return {...state, formdata: action.data}
      const newState = Object.assign({}, state);
      newState.formdata = action.data;
      return newState;
    }
    case UPDATE_FIELD_VALUE: {
      const newState = Object.assign({}, state);
      newState.formdata[action.data.name] = action.data.value;
      return newState;
      /* return {
        ...state,
        formdata: {
          ...state.formdata,
          [action.data.name]: action.data.value
        }
      } */
    }
    case LOADNG_SPINNER: {
      return state;
    }
    default: 
      return state;
  }
};
    
export default appdata;