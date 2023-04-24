
import { SET_CONTACT_DATA, SET_ADDRESS_DATA, SET_CUSTOMER_DATA, SET_PRODUCT_COUNT, SET_LOGO_DATA } from './actions';
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
      return { loading: false, address_Data: action.payload };
    default:
      return state;
  }
};





const custumerdetailsinitialState = {

  USER_DATA: {
    loading: false,
    error: ""

  },

  

}


export const userdatareducer = (state = custumerdetailsinitialState, action) => {
  switch (action.type) {

    case SET_CUSTOMER_DATA:
      return { loading: false, USER_DATA: action.payload };
 
    default:
      return state;
  }
};





const productinitialState = {

  
  TotalCount: {
    loading: false,
    error: ""

  },
}


export const ProductCountReducer = (state = productinitialState, action) => {
  switch (action.type) {


    case SET_PRODUCT_COUNT:
      const data = action.payload
      return {  TotalCount : data};
    default:
      return state;
  }
};





const Appdetails = {

  
  appdata: {
   


  },
}


export const appDatareducer = (state = Appdetails, action) => {
  switch (action.type) {


    case SET_LOGO_DATA:

      return {  appdata : action.payload};
    default:
      return state;
  }
};











