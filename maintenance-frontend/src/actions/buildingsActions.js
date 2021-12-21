import axios from 'axios'

export const fetchBuildings = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_BUILDINGS'})
      axios.get('http://localhost:3000/buildings',{withCredentials: true})
      .then(response => {
      dispatch({ type: 'ADD_BUILDINGS', buildings: response.data})
      })
    }
  }

  export const fetchBuilding = (id) =>{
    return (dispatch) => {
      dispatch({ type: 'LOADING_BUILDING'})
      axios.get(`http://localhost:3000/buildings/${id}`,{withCredentials: true})
      .then(response => {
        dispatch({ type: 'ADD_BUILDING', building: response.data})
      })    
    }
  }



export const createBuilding = (building) => {
  
    return (dispatch) => {
        dispatch({ type: 'LOADING_BUILDINGS'})
        axios.post('http://localhost:3000/buildings', building, {withCredentials: true})
        .then(response => {

          dispatch({ type: 'ADD_BUILDINGS', buildings: response.data})
      })
    }
  }

  export const editBuilding = (params) => {
    return (dispatch) => {
        dispatch({type: "LOADING_BUILDING"})
        axios.patch(`http://localhost:3000/buildings/${params.id}`, params ,{withCredentials: true})
        .then(response => {
            dispatch({ type: 'ADD_BUILDING', building: response.data})
        })
    }
  
}
