
import {SET_CATEGORY_DATA} from './actions';
const categoryinitialState = {
  category_Data: {
    loading:false,
    error:""

  },
}
 

export const categoryReducer = (state = categoryinitialState, action) => {
  switch (action.type) {
      case SET_CATEGORY_DATA:
     
        return  {loading:false,category_Data: action.payload};
        // {login:false, loginData: action.payload};
   
        // {
          
        //   ...action.payload, 
        // }; 
      
    default:
      return state;
  }
};


// function CategoryReducer(state = categoryinitialState,action) {
//  

//   switch (action.type) {
//     case SET_CATEGORY_DATA:
//       return {...action.payload};
//     default:
//       return state;
//   }
// }
// export default CategoryReducer;
