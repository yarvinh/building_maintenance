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



export const createBuilding = (building) => {
  
    return (dispatch) => {
        dispatch({ type: 'LOADING_BUILDINGS'})
        axios.post('http://localhost:3000/buildings', building, {withCredentials: true})
        .then(response => {

          dispatch({ type: 'ADD_BUILDINGS', buildings: response.data})
      })
    }
  }