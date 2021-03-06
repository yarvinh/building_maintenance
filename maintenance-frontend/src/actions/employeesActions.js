import axios from 'axios'

  export const fetchEmployees = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_EMPLOYEES'})
      axios.get('http://localhost:3000/employees',{withCredentials: true})
      .then(response => {
      dispatch({ type: 'ADD_EMPLOYEES', employees: response.data})
      })
    }
  }

  export const createEmployee = (employee) => {
      return (dispatch) => {
          dispatch({type: "LOADING_EMPLOYEE"})
          axios.post('http://localhost:3000/employees', employee ,{withCredentials: true})
          .then(response => {
              const error = response.data.error_message
              error? dispatch({ type: 'ADD_ERROR', errors: response.data.error_message}):  dispatch({ type: 'ADD_EMPLOYEES', employees: response.data})
          })
      }
    
  }

  export const editEmployee = (params) => {
    return (dispatch) => {
        dispatch({type: "LOADING_EMPLOYEE"})
        axios.patch(`http://localhost:3000/employees/${params.id}`, params ,{withCredentials: true})
        .then(response => {
            const error = response.data.error_message
            error? dispatch({ type: 'ADD_ERROR', errors: response.data.error_message}):  dispatch({ type: 'ADD_EMPLOYEES', employees: response.data})
        })
    }
  
}


export const deleteEmployee = (id) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_EMPLOYEES'})
    axios.delete(`http://localhost:3000/employees/${id}`,{withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_EMPLOYEES', employees: response.data })
    })
  }
}
