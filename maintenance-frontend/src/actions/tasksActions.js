import axios from 'axios'

export const createTask  = (reply) => {
    return (dispatch) => {
        dispatch({type: "LOADING_TASKS"})
        axios.post('http://localhost:3000/tasks', reply ,{withCredentials: true})
        .then(response => {
            console.log(response)
            const error = response.data.error
           error? dispatch({ type: 'ADD_TASKS', task: response.data}) : dispatch({ type: 'ADD_TASKS', tasks: response.data})
        })
    }  
}
