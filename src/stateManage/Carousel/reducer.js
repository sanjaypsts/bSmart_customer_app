
import {SET_CAROUSEL_DATA} from './actions';
const  carouselinitialState = {
  carouselData_Data: []



}
 

export const carouselReducer = (state = carouselinitialState, action) => {
  switch (action.type) {
      case SET_CAROUSEL_DATA:
     
        return {carouselData_Data: action.payload};
    
    default:
      return state;
  }
};

