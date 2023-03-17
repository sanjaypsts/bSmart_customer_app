
import apicall from "../apicall";
export const GET_LOGIN_DATA = 'GET_LOGIN_DATA';


export const Relogin = (value) => {
  try {
    return async dispatch => {
      const callBackResult = await apicall().post('/mcustomerLogin', value)
      if (callBackResult.data) {
        console.log('Unable',callBackResult.data);
        dispatch({
          type: GET_LOGIN_DATA,
          payload: callBackResult.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};














