import axios from 'axios'

export const fetchComments = (id) => {
    const params = {
        answer: { toJSON: () => id },
        id:id
      };
      
    return (dispatch) => {
        dispatch({type: "LOADING_COMMENTS"})
        axios.get('http://localhost:3000/comments', {params}, {withCredentials: true})
        .then(response => {
            dispatch({ type: 'ADD_COMMENTS', comments: response.data})
        })
    }  
}

export const createComment = (comment) => {
    return (dispatch) => {
        dispatch({type: "LOADING_COMMENTS"})
        axios.post('http://localhost:3000/comments', comment ,{withCredentials: true})
        .then(response => {
            const error = response.data.error
           error? dispatch({ type: 'ADD_COMMENT', comment: response.data}) : dispatch({ type: 'ADD_COMMENTS', comments: response.data})
        })
    }  
}


export const deleteComment = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_COMMENTS'})
      axios.delete(`http://localhost:3000/comments/${id}`,
      ).then(response => {   
        dispatch({ type: 'ADD_COMMENTS', comments: response.data })
      })
    }
}