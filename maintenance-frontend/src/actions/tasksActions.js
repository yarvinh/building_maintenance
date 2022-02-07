import axios from 'axios'

export const fetchTasks = (id) => {
    const params = {
        params: { toJSON: () => id },
        id:id
      };   
    return (dispatch) => {
        dispatch({type: "LOADING_TASKS"})
        axios.get('http://localhost:3000/tasks', {params}, {withCredentials: true})
        .then(response => {
            dispatch({ type: 'ADD_TASKS', tasks: response.data})
        })
    }  
}


export const createTask  = (task) => {
  
    return (dispatch) => {
        dispatch({type: "LOADING_TASKS"})
        axios.post('http://localhost:3000/tasks', task ,{withCredentials: true})
        .then(response => {
            const error = response.data.error
           error? dispatch({ type: 'ADD_TASK', task: response.data}) : dispatch({ type: 'ADD_TASKS', tasks: response.data})
        })
    }  
}
