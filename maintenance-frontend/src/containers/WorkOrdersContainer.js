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
                    return <p key={i}>{err}</p>
                })      
        }else{
            return (
                <>
            <table className="table table-striped" > 
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Due Date</th>
                <th scope="col">Address</th>
                <th scope="col">Summary</th>
                <th scope="col">Assigned </th>
            </tr>
            </thead>
            <tbody>
              {workOrders.map((workOrder,index) => {return (<WorkOrder key={workOrder.id} index={index + 1} workOrder={workOrder}/>)}) }
            </tbody>
            </table>
            </>
             ) 
        }
    
    }


   return(
       <div>
           <div>
               <CreateWorkOrder employees={employees} buildings={buildings}/>
           </div>
           
      
           {!id? renderWorkOrders(): null } 
       
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