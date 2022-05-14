import axios from 'axios'
export const createUser = (user) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        axios.post('http://localhost:3000/users', user, {withCredentials: true})
        .then(response => {
          const error = response.data.error_message
          error? dispatch({ type: 'ADD_ERROR', errors: response.data.error_message}):  dispatch({ type: 'ADD_USER', user: response.data})
      })
    }
  }


  export const fetchCurrentUser = () => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER'})
        axios.get('http://localhost:3000/checklogin', 
        {withCredentials: true})    
        .then(response => {
            dispatch({ type: 'ADD_USER', user: response.data})
        })
        .catch(error => console.log('api errors:', error))

    }

  }

  export const fetchLogOut = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_USER'})
        axios.delete('http://localhost:3000/logout', 
         {withCredentials: true})
        .then(response=> {
            dispatch({ type: 'ADD_USER', user: response.data })
      
        })
      }

  }

  export const fetchLogIn=(user,url)=> {
    return (dispatch) => {
      dispatch({ type: 'LOADING_USER'})
        axios.post(url, 
        {user}, {withCredentials: true})
        .then(response=> {
          const error = response.data.error_message
          error? dispatch({ type: 'ADD_ERROR', errors: response.data.error_message}):  dispatch({ type: 'ADD_USER', user: response.data})
        })
  }
}
