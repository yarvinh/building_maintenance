import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchBuildings} from '../actions/buildingsActions'
import { fetchEmployees} from '../actions/employeesActions'
 const WorkOrdersContainer = (props)=>{
    const {employees} = props.employees
    const {buildings} = props.buildings
    useEffect(() => {
        if (employees.length === 0){
           props.fetchEmployees()
        }
        if (buildings.length === 0){
           props.fetchBuildings() 
        }
    },[ ]);

   return(
       <div>
           <div>
               <CreateWorkOrder employees={employees} buildings={buildings}/>
           </div>
       </div>
   )
}



const mapStateToProps = state => { 
    return {
        employees: state.employees,
        buildings: state.buildings,
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        fetchBuildings: (action) => dispatch(fetchBuildings(action)),
        fetchEmployees: (action) => dispatch(fetchEmployees(action))
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(WorkOrdersContainer)