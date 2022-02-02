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


  const BuildingReducer = (state = { building: {}, loading: false }, action)=>{
    switch(action.type) {
      case 'LOADING_BUILDING':
      return state = {
        ...state,
        building: state.building,
        loading: true,    
      }

      case 'ADD_BUILDING':
        return {
           ...state,
          building: action.building,
          loading: false
      } 

    default:
      return state;
    }
  }

  const WorkOrdersReducer = (state = { workOrders: [], loading: false ,filter_by: ""}, action) => {

    switch(action.type) {
        case 'LOADING_WORK_ORDERS':
        return state ={
          ...state,
          workOrders: state.workOrders,
          filter_by: state.filter_by,
          loading: true,    
        }
 
        case 'ADD_WORK_ORDERS':
          return {
             ...state,
            workOrders: action.workOrders,
            filter_by: action.filter_by,
            loading: false
        } 

      default:
        return state;
    }
  }

  const EmployeeWorkOrdersReducer = (state = { employeeWorkOrders: [], loading: false ,filter_by: ""}, action) => {
    // console.log(action)
    switch(action.type) {
        case 'EMPLOYEE_WORK_ORDERS':
          return {
             ...state,
            employeeWorkOrders: action.employeeWorkOrders,
            filter_by: action.filter_by,
            loading: false
        } 

      default:
        return state;
    }
  }



  const WorkOrderReducer = (state = { workOrder: {}, loading: false }, action)=>{
    switch(action.type) {
      case 'LOADING_WORK_ORDER':
      return state = {
        ...state,
        workOrder: state.workOrder,
        loading: true,    
      }

      case 'ADD_WORK_ORDER':
        return {
           ...state,
          workOrder: action.workOrder,
          loading: false
      } 

    default:
      return state;
    }
  }

const CommentsReducer=(state={comments: [],loading: false},action)=>{
  switch(action.type) {
    case 'LOADING_COMMENTS':
    return state = {
      ...state,
      comments: state.comments,
      loading: true,    
    }
    case 'ADD_COMMENTS':
      return {
         ...state,
        comments: action.comments,
        loading: false
    } 
  default:
    return state;
  }
}

const commentReducer = (state = { comment: {}, loading: false }, action)=>{
  switch(action.type) {
    case 'LOADING_COMMENT':
    return state = {
      ...state,
      comment: state.comment,
      loading: true,    
    }

    case 'ADD_COMMENT':
      return {
         ...state,
        comment: action.comment,
        loading: false
    } 

  default:
    return state;
  }
}

const RepliesReducer = (state={replies: [],loading: false},action)=>{
  switch(action.type) {
    case 'LOADING_REPLIES':
    return state = {
      ...state,
      replies: state.replies,
      loading: true,    
    }
    case 'ADD_REPLIES':
      return {
         ...state,
        replies: action.replies,
        loading: false
    } 
  default:
    return state;
  }
}

const ReplyReducer = (state = { reply: {}, loading: false }, action)=>{
  switch(action.type) {
    case 'LOADING_REPLY':
    return state = {
      ...state,
      reply: state.reply,
      loading: true,    
    }

    case 'ADD_REPLY':
      return {
         ...state,
        reply: action.reply,
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
   building: BuildingReducer,
   workOrders: WorkOrdersReducer,
   employeeWorkOrders: EmployeeWorkOrdersReducer,
   workOrder: WorkOrderReducer,
   comments: CommentsReducer,
   comment:  commentReducer,
   replies: RepliesReducer,
   reply: ReplyReducer 
});
   
  export default rootReducer;