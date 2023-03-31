
import { SET_CONTACT_DATA, SET_ADDRESS_DATA } from './actions';
const initialState = {
  contact_Data: {
    loading: false,
    error: ""

  },

}


export const userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT_DATA:
      return { loading: false, contact_Data: action.payload };
  
    default:
      return state;
  }
};





const addressinitialState = {

  address_Data: {
    loading: false,
    error: ""

  },
}


export const addressReducer = (state = addressinitialState, action) => {
  switch (action.type) {
  
    case SET_ADDRESS_DATA:
      return { loading: false,address_Data: action.payload };
    default:
      return state;
  }
};


