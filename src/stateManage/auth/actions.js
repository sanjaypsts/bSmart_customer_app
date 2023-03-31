
import apicall from "../apicall";
export const GET_LOGIN_DATA = 'GET_LOGIN_DATA';


export const Relogin = (value) => {
   
  try {
    return async dispatch => {
    
        dispatch({
          type: GET_LOGIN_DATA,
          payload: value,
        });
 
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};















