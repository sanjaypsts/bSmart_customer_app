
import {SET_ORDER_DATA} from './actions';
const orderinitialState = {
  Order_Data: {
    loading:false,
    error:""

  },
}
 

export const orderReducer = (state = orderinitialState, action) => {
  switch (action.type) {
      case SET_ORDER_DATA:
     
        return  {loading:false,Order_Data: action.payload};
    
    default:
      return state;
  }
};

