
import {SET_CART_DATA} from './actions';
const cartinitialState = {
  cart_Data: {
    loading:false,
    error:""

  },
}
 

export const cartReducer = (state = cartinitialState, action) => {
  switch (action.type) {
      case SET_CART_DATA:
     
        return  {loading:false,cart_Data: action.payload};

      
    default:
      return state;
  }
};


