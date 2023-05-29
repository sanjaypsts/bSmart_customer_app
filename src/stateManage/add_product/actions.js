
import apicallHeaderPost from "../apicallHeaderPost";

export const SET_SINGLE_CATEGORY_DATA = 'SET_SINGLE_CATEGORY_DATA';





export const Single_Category_SET = (data,url,value) => {

 
  try {
    return async dispatch => {
      dispatch({
        type: SET_SINGLE_CATEGORY_DATA,
        payload: {loading:true},
      });
 
      apicallHeaderPost(data,url,value)
        .then(response => {
         
          if (response.status == 200 && response.data.status == true || response.data.status == 'true') {
            dispatch({
              type: SET_SINGLE_CATEGORY_DATA,
              payload: response.data.data.data_list,
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


