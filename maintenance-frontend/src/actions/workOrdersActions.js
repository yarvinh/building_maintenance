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
              dispatch({ type: 'ADD_WORK_ORDERS', workOrders: response.data})
          })
      }
    
  }

  export const fetchWorkOrder = (id) =>{
    return (dispatch) => {
      dispatch({ type: 'LOADING_WORK_ORDER'})
      axios.get(`http://localhost:3000/work_orders/${id}`,{withCredentials: true})
      .then(response => {
        console.log(response)
        dispatch({ type: 'ADD_WORK_ORDER', workOrder: response.data})
      })    
    }
  }
