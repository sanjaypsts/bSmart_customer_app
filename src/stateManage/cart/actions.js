import apicallHeader from "../apicallHeader";
import apicallHeaderPost from "../apicallHeaderPost";

export const SET_CART_DATA = 'SET_CART_DATA';


export const Cart_SET = (data) => {
 
  try {
    return async dispatch => {
      dispatch({
        type: SET_CART_DATA,
        payload: data,
      });

      // apicallHeaderPost(data,url, value)
      //   .then(response => {
      //     if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
      //       dispatch({
      //         type: SET_CART_DATA,
      //         payload: response.data.data,
      //       });
      //     } else {
      //     }
      //   }).catch(err => {
        
      //     if (err) {
           
      //     }
      //   })
    };
  } catch (error) {

  }
};

