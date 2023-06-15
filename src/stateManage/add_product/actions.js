
import apicallHeaderPost from "../apicallHeaderPost";

export const SET_SINGLE_CATEGORY_DATA = 'SET_SINGLE_CATEGORY_DATA';





export const SingleCategorySET = (data) => {
  console.log("data",data)


 
  try {
    return async dispatch => {
      dispatch({
        type: SET_SINGLE_CATEGORY_DATA,
        payload: data,
      });
 
    };
  } catch (error) {

  }
};


