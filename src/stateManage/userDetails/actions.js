
import apicallHeaderPost from "../apicallHeaderPost";

export const SET_CONTACT_DATA = 'SET_CONTACT_DATA';
export const SET_ADDRESS_DATA = 'SET_ADDRESS_DATA';
export const SET_CUSTOMER_DATA = 'SET_CUSTOMER_DATA';
export const SET_PRODUCT_COUNT = 'SET_PRODUCT_COUNT';
export const SET_LOGO_DATA = 'SET_LOGO_DATA';





export const App_Logo_Set = (data) => {

  try {
    return async dispatch => {
    

 
            dispatch({
              type: SET_LOGO_DATA,
              payload: data,
            });
   
    };
  } catch (error) {

  }
};




export const CONTACT_SET = (data,url, value) => {

  try {
    return async dispatch => {
      dispatch({
        type: SET_CONTACT_DATA,
        payload: {loading:true},
      });

      apicallHeaderPost(data,url,value)
        .then(response => {
          if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
        
            dispatch({
              type: SET_CONTACT_DATA,
              payload: response.data.data,
            });
          } else {
          }
        }).catch(err => {
          console.lo0g(err.response.data)
          if (err) {
   
          }
        })
    };
  } catch (error) {

  }
};






export const ADDRESS_SET = (data,url,value) => {

  try {
    return async dispatch => {
      dispatch({
        type: SET_ADDRESS_DATA,
        payload: {loading:true},
      });

      apicallHeaderPost(data,url,value)
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



// customerProfile




export const CUSTOMER_PROFILE_SET = (data,url,value) => {
  console.log(data,url,value)
 

  try {
    return async dispatch => {
      dispatch({
        type: SET_CUSTOMER_DATA,
        payload: {loading:true},
      });

      apicallHeaderPost(data,url,value)
        .then(response => {
        console.log(response.status)
          if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
            dispatch({
              type: SET_CUSTOMER_DATA,
              payload:response.data.data,
            });
          } else {
          }
        }).catch(err => {
          console.log(err)
          if (err) {
            
          }
        })
    };
  } catch (error) {

  }
};






export const Product_Count_SET = (data) => {
 

  try {
    return async dispatch => {
      dispatch({
        type: SET_PRODUCT_COUNT,
        payload: data,
      });

    
    };
  } catch (error) {

  }
};




