
import {GET_LOGIN_DATA} from './actions';
const initialState = {
  loginData: {
    status:false,
    data:{
      tocken:null
    }

  },
  
};
function loginReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN_DATA:
      return {login:false,loginData: action.payload};
    default:
      return state;
  }
}
export default loginReducer;
