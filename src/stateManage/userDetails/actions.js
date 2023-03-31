
import apicallHeaderPost from "../apicallHeaderPost";

export const SET_CONTACT_DATA = 'SET_CONTACT_DATA';
export const SET_ADDRESS_DATA = 'SET_ADDRESS_DATA';


export const CONTACT_SET = (url, value) => {

  try {
    return async dispatch => {
      dispatch({
        type: SET_CONTACT_DATA,
        payload: {loading:true},
      });

      apicallHeaderPost({ customer_id: "" },url,value)
        .then(response => {
          if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
            dispatch({
              type: SET_CONTACT_DATA,
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






export const ADDRESS_SET = (url, value) => {

  try {
    return async dispatch => {
      dispatch({
        type: SET_ADDRESS_DATA,
        payload: {loading:true},
      });

      apicallHeaderPost({ customer_id: "" },url,value)
        .then(response => {
          if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
            dispatch({
              type: SET_ADDRESS_DATA,
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



