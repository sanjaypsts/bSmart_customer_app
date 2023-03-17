// import { UserData } from './initialState';



// export const ExisitingReducer = (action/* state = ExisitingReportinitialState, action */) => {
//     console.log('action',action)
//     return {

//         ...action,
//     };

    
// };

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
      return {login:true, loginData: action.payload};
    default:
      return state;
  }
}
export default loginReducer;
