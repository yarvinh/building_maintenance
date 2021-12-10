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
              console.log(response.data)
              dispatch({ type: 'ADD_EMPLOYEES', employees: response.data})
          })
      }
    
  }