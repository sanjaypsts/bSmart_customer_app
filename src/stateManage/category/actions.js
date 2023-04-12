import apicallHeader from "../apicallHeader";

export const SET_CATEGORY_DATA = 'SET_CATEGORY_DATA';
export const SET_CATEGORY_ERROR = 'SET_CATEGORY_ERROR';


export const Category_SET = (url, value) => {

  try {
    return async dispatch => {
      dispatch({
        type: SET_CATEGORY_DATA,
        payload: { loading: true, status: false,ErrorData:[],Data:[] },

      });

      apicallHeader(url, value)
        .then(response => {
          if (response.status == 200 && response.data.status == true || response.data.status == 'true' && response.data.data != undefined) {

            const Data = response.data.data
            dispatch({
              type: SET_CATEGORY_DATA,
              payload: { loading: false, status: true, Data,ErrorData:[] },


            });
          } else {
          }
        }).catch(err => {

          if (err) {
            const ErrorData = err.response.data
            dispatch({
              type: SET_CATEGORY_ERROR,
              payload: { loading: false, status: false, Data: [] ,ErrorData},

            });

          }
        })
    };
  } catch (error) {

  }
};

