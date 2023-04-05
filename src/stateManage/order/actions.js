
import apicallHeaderPost from "../apicallHeaderPost";

export const SET_ORDER_DATA = 'SET_ORDER_DATA';


export const Order_SET = (data,url, value) => {
 
  try {
    return async dispatch => {
      dispatch({
        type: SET_ORDER_DATA,
        payload: {loading:true},
      });

      apicallHeaderPost(data,url, value)
        .then(response => {
          if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
            dispatch({
              type: SET_ORDER_DATA,
              payload: response.data.data,
            });
          } else {
          }
        }).catch(err => {
        
          if (err) {
           
          }
        })
    };
  } catch (error) {

  }
};

