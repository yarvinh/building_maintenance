import axios from 'axios'

export const createComment = (comments) => {
    return (dispatch) => {
        dispatch({type: "LOADING_COMMENTS"})
        axios.post('http://localhost:3000/comments', comments ,{withCredentials: true})
        .then(response => {
            dispatch({ type: 'ADD_COMMENTS', comments: response.data})
        })
    }  
}