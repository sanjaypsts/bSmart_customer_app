
export const SET_TOCKEN = 'SET_TOCKEN';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';



export const Relogin = (value) => {


   
  try {
    return async dispatch => {

      const Tocken =value.data.token
      const DATA = value.data.customer_shipping_address_alias_id

    
        dispatch({
          type: SET_TOCKEN,
          payload: { loginStatus:true,Tocken},
        });
        dispatch({
          type: SET_USER_DETAILS,
          payload: { DATA},
        });
 
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};















