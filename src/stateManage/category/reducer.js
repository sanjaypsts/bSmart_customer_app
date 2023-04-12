
import { SET_CATEGORY_DATA, SET_CATEGORY_ERROR } from './actions';
const categoryinitialState = {
  category_Data: {
    loading: true,
    status: false,
    error: ""

  },
}


export const categoryReducer = (state = categoryinitialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_DATA:

      return { loading: false, category_Data: action.payload };
    case SET_CATEGORY_ERROR:
      return { loading: false, category_Data: action.payload };
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
