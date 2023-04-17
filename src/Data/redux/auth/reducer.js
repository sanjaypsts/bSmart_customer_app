
import { SET_TOCKEN, SET_USER_DETAILS } from './actions';
const initialState = {

  identifyData: {
    loginStatus: false,
    tocken: ""

  },
  userDetails: {


  },

};
function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOCKEN:
      return { identifyData: action.payload };
    case SET_USER_DETAILS:
      return {...state,userDetails: action.payload };
    default:
      return state;
  }
}
export default loginReducer;
