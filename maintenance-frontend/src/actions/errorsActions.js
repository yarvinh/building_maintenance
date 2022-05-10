export const clearErrors = () =>{
    return (dispatch) => (dispatch({ type: 'CLEARING_ERRORS',errors: []}) )   
  }
  