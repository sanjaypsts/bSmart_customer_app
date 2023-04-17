
import { SET_CREDIT_ORDERS, SET_SETTLED_ORDERS } from './actions';
const initialState = {

  creditOrder: {
  

  },
  settledOrder: {


  },

};
function creditDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CREDIT_ORDERS:
      return { creditOrder: action.payload };
    case SET_SETTLED_ORDERS:
      return {...state,settledOrder: action.payload };
    default:
      return state;
  }
}
export default creditDataReducer;
