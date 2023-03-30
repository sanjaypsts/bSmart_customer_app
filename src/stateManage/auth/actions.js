
import apicall from "../apicall";
export const GET_LOGIN_DATA = 'GET_LOGIN_DATA';


export const Relogin = (value) => {
   
  try {
    return async dispatch => {
    
        dispatch({
          type: GET_LOGIN_DATA,
          payload: value,
        });
 
    };
  } catch (error) {
    // Add custom logic to handle errors
  }
};



// export const Relogin = (value) => {
//   try {
//     return async dispatch => {
//       const callBackResult = await apicall().post('/mcustomerLogin', value)
//       if (callBackResult.data) {
       
//         dispatch({
//           type: GET_LOGIN_DATA,
//           payload: callBackResult.data,
//         });
//       } else {
    
//       }
//     };
//   } catch (error) {
//     // Add custom logic to handle errors
//   }
// };



// apicall({ 'login_email': username, 'password': password },'/mcustomerLogin')
// .then(response => {
//     console.log(response)
//     return
//     // console.log(responseData.response_json.response_status)
//     // console.log(responseData.error_json.error_message)
//     if (response) {
//         try {
//             if (response.status == 200 && response.data.response_status == 1) {




//             }
//             else {

//             }


//         } catch {
//             console.log('err')
//             // alert(responseData.error_json.error_message)
//         }
//     }


// }).catch(err => {

//     console.log(err)

//     if (err) {
//         console.log(err)
//     }
// })














