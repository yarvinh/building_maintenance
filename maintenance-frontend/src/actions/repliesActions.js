import axios from 'axios'

export const fetchReplies = (id) => {
    const params = {
        answer: { toJSON: () => id },
        id:id
      };
      
    return (dispatch) => {
        dispatch({type: "LOADING_COMMENTS"})
        axios.get('http://localhost:3000/replies', {params}, {withCredentials: true})
        .then(response => {
            dispatch({ type: 'ADD_COMMENTS', comments: response.data})
        })
    }  
}

export const createReply = (reply) => {
    return (dispatch) => {
        dispatch({type: "LOADING_COMMENTS"})
        axios.post('http://localhost:3000/replies', reply ,{withCredentials: true})
        .then(response => {
            const error = response.data.error
           error? dispatch({ type: 'ADD_REPLY', reply: response.data}) : dispatch({ type: 'ADD_COMMENTS', comments: response.data})
        })
    }  
}




export const deleteReply = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_REPLIES'})
      axios.delete(`http://localhost:3000/replies/${id}`,
      ).then(response => {   
        dispatch({ type: 'ADD_REPLIES', replies: response.data })
      })
    }
}