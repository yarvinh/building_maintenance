import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBuildings} from '../actions/buildingsActions'
import { fetchEmployees} from '../actions/employeesActions'
import { fetchWorkOrders} from '../actions/workOrdersActions'
import WorkOrder from "../components/workorders/WorkOrder"
 const WorkOrdersContainer = (props)=>{
    const {id} = useParams()
     const {workOrders} = props.workOrders
    const {employees} = props.employees
    const {buildings} = props.buildings
    useEffect(() => {
        props.fetchWorkOrders() 
        if (employees.length === 0){
           props.fetchEmployees()
        }
        if (buildings.length === 0){
           props.fetchBuildings() 
        }
    },[ ]);

    const renderWorkOrders = () => {    
        if (workOrders.error_message){ 
                return workOrders.error_message.map((err, i)=>{
                    return <li key={i}>{err}</li>
                })      
        }else{
            return  workOrders.map((workOrder) => {
               return <WorkOrder key={workOrder.id} workOrder={workOrder}/>  
            })   
        }
    
    }


   return(
       <div>
           <div>
               <CreateWorkOrder employees={employees} buildings={buildings}/>
           </div>
           <div>
              {!id? renderWorkOrders(): null }
            </div>
       </div>
   )
}



const mapStateToProps = state => { 
    return {
        employees: state.employees,
        buildings: state.buildings,
        workOrders: state.workOrders,
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        fetchBuildings: (action) => dispatch(fetchBuildings(action)),
        fetchEmployees: (action) => dispatch(fetchEmployees(action)),
        fetchWorkOrders: (action) => dispatch(fetchWorkOrders(action)),
        
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(WorkOrdersContainer)