
import { SET_SINGLE_CATEGORY_DATA } from './actions';
const single_categoryinitialState = {
  single_category_Data: []


  

}

export const single_categoryReducer = (state = single_categoryinitialState,action) => {

  switch (action.type) {
    case SET_SINGLE_CATEGORY_DATA:
      return {single_category_Data:action.payload };
    default:
      return state;
  }
};

