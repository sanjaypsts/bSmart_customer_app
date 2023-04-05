import AsyncStorage from '@react-native-async-storage/async-storage';




export const storeContactNumber = async (value) => {
    try {
   
      await AsyncStorage.setItem('SelectedContact',value);
    } catch (e) {
      // saving error
    }
  }

  
export const storeName = async (value) => {
  try {
 
    await AsyncStorage.setItem('SelectedName',value);
  } catch (e) {
    // saving error
  }
}


    export const getContactNumber = async () => {
    try {
        const value = await AsyncStorage.getItem('SelectedContact')
        if(value){
          
            return value;
        }else {
            return null;
        }
    } catch(e) {
      // error reading value
    }
  }


  
  export const getContactName = async () => {
    try {
        const value = await AsyncStorage.getItem('SelectedName')
        if(value){
          
            return value;
        }else {
            return null;
        }
    } catch(e) {
      // error reading value
    }
  }





  export const storeCartCount = async (value) => {
    try {
      await AsyncStorage.setItem('TotalSelectProduct',value);
    } catch (e) {
      // saving error
    }
  }


  export const getCartCount = async () => {
    try {
        const value = await AsyncStorage.getItem('TotalSelectProduct')
        if(value){
          
            return value;
        }else {
            return null;
        }
    } catch(e) {
      // error reading value
    }
  }


















// export const storeAuthToken = async (value) => {
//     try {
//         
//     //   await AsyncStorage.setItem('auth_token', value);
//     } catch (e) {
//       // saving error
//     }
//   }

//   export const removeAuthToken = async () => {
//     try {
     
//       await AsyncStorage.removeItem('auth_token')
//     } catch (e) {
//       // saving error
//     }
//   }
//   export const getAuthToken = async () => {
//     try {
//         const value = await AsyncStorage.getItem('auth_token')
//         if(value){
          
//             return value;
//         }else {
//             return null;
//         }
//     } catch(e) {
//       // error reading value
//     }
//   }