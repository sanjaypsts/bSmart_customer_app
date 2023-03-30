
import {GET_CATEGORY} from './actions';
const initialState = {
  categoryData: {
  
  },
  
};
function CategoryReducer(state = initialState, action) {

  switch (action.type) {
    case GET_CATEGORY:
      return {categoryData:action.payload};
    default:
      return state;
  }
}
export default CategoryReducer;
