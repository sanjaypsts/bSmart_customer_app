
import { SET_SINGLE_CATEGORY_DATA } from './actions';
const single_categoryinitialState = {
  single_category_Data: {
    loading: false,
    error: ""

  },

}

export const single_categoryReducer = (state = single_categoryinitialState,action) => {
  console.log("action.payload",action.payload)
  switch (action.type) {
    case SET_SINGLE_CATEGORY_DATA:
      return { loading: false,single_category_Data:action.payload };
    default:
      return state;
  }
};

