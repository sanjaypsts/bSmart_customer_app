import apicallHeader from "../apicallHeader";

export const SET_CATEGORY_DATA = 'SET_CATEGORY_DATA';


export const Category_SET = (url, value) => {
 
  try {
    return async dispatch => {
      dispatch({
        type: SET_CATEGORY_DATA,
        payload: {loading:true},
      });

      apicallHeader(url, value)
        .then(response => {
          if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
            dispatch({
              type: SET_CATEGORY_DATA,
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

