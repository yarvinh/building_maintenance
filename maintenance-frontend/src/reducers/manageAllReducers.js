import { combineReducers } from "redux";


const UserReducer = (state = { user: {}, loading: false }, action) => {
    switch(action.type) {
        case 'LOADING_USER':
        return state ={
          ...state,
          user: state.user,
          loading: true,    
        }
 
        case 'ADD_USER':
          return {
             ...state,
            user: action.user,
            loading: false
        } 

      default:
        return state;
    }
  }


  const EmployeesReducer = (state = { employees: [], loading: false }, action) => {
    switch(action.type) {
        case 'LOADING_EMPLOYEES':
        return state ={
          ...state,
          employees: state.employees,
          loading: true,    
        }
 
        case 'ADD_EMPLOYEES':
          return {
             ...state,
            employees: action.employees,
            loading: false
        } 

      default:
        return state;
    }
  }

  const EmployeeReducer = (state = { employee: {}, loading: false }, action)=>{
    switch(action.type) {
      case 'LOADING_EMPLOYEE':
      return state = {
        ...state,
        employee: state.employee,
        loading: true,    
      }

      case 'ADD_EMPLOYEE':
        return {
           ...state,
          employee: action.employee,
          loading: false
      } 

    default:
      return state;
    }
  }


  const BuildingsReducer = (state = { buildings: [], loading: false }, action) => {
    switch(action.type) {
        case 'LOADING_BUILDINGS':
        return state ={
          ...state,
          buildings: state.buildings,
          loading: true,    
        }
 
        case 'ADD_BUILDINGS':
          return {
             ...state,
            buildings: action.buildings,
            loading: false
        } 

      default:
        return state;
    }
  }

const rootReducer = combineReducers({
   user: UserReducer,  
   employees: EmployeesReducer,
   employee: EmployeeReducer,
   buildings: BuildingsReducer,
});
   
  export default rootReducer;