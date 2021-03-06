import axios from 'axios'
  export const fetchWorkOrders = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_WORK_ORDERS'})
      axios.get('http://localhost:3000/work_orders',{withCredentials: true})
      .then(response => {
      dispatch({ type: 'ADD_WORK_ORDERS', workOrders: response.data})
      })
    }
  }

  export const createWorkOrder = (workOrders) => {
      return (dispatch) => {
          dispatch({type: "LOADING_WORK_ORDERS"})
          axios.post('http://localhost:3000/work_orders', workOrders ,{withCredentials: true})
          .then(response => {
              const error = response.data.error_message
              error? dispatch({ type: 'ADD_ERROR', errors: response.data.error_message}):  dispatch({ type: 'ADD_WORK_ORDERS', workOrders: response.data})
          })
      }  
  }


  export const editWorkOrder = (work_order) => {

    return (dispatch) => {
        dispatch({type: "LOADING_WORK_ORDERS"})
        axios.patch(`http://localhost:3000/work_orders/${work_order.id}`, work_order ,{withCredentials: true})
        .then(response => {
          const error = response.data.error_message
          error? dispatch({ type: 'ADD_ERROR', errors: response.data.error_message}):  dispatch({ type: 'ADD_WORK_ORDERS', workOrders: response.data})
        })
    } 
}


export const deleteWorkOrder = (id) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_WORK_ORDERS'})
    axios.delete(`http://localhost:3000/work_orders/${id}`,{withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_WORK_ORDERS', workOrders: response.data })
    })
  }
}


export const  workOrderFilter = (workOrders) => {
  return ({ type: 'ADD_WORK_ORDERS_TO_FILTER', workOrders: workOrders.workOrders,filter_by: workOrders.filter_by})
}

export const getEmployeeWorkOrders = (employeeWorkOrders) =>{
  return ({ type: 'EMPLOYEE_WORK_ORDERS', employeeWorkOrders: employeeWorkOrders.workOrders, filter_by: employeeWorkOrders.filter_by})     
}





