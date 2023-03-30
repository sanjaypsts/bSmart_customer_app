import apicallHeader from "../apicallHeader";
export const GET_CATEGORY = 'GET_CATEGORY';



export const GetCategory = (value) => {

    return async dispatch => {

        apicallHeader('/mgetCategoryDetails',value)
            .then(response => {
                

                if ( response.data.status !=  undefined && response.data.status == true || response.data.status == 'true') {
                   
                    dispatch({
                        type: GET_CATEGORY,
                        payload: response.data.data,
                      });

                } else {

                }

            }).catch(err => {


            

                if (err) {
                 
                }
            })
        //   const callBackResult = await apicall().post('/mcustomerLogin', value)
        //   if (callBackResult.data) {

        //     dispatch({
        //       type: GET_LOGIN_DATA,
        //       payload: callBackResult.data,
        //     });
        //   } else {

        //   }
    };

};

























