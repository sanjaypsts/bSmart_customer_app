
export const SET_CREDIT_ORDERS = 'SET_CREDIT_ORDERS';
export const SET_SETTLED_ORDERS = 'SET_SETTLED_ORDERS';



export const Credit_Data = (value) => {



  try {
    return async dispatch => {

      const CreditOrder  = value.pending_amount
      const SettledOrder = value.settled

      dispatch({
        type: SET_CREDIT_ORDERS,
        payload: { CreditOrder },
      });
      dispatch({
        type: SET_SETTLED_ORDERS,
        payload: { SettledOrder },
      });

    };
  } catch (error) {
   
  }
};















