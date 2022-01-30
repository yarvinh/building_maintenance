import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
// import { fetchBuildings} from '../actions/buildingsActions'
// import { fetchEmployees} from '../actions/employeesActions'
// import { workOrderFilter} from '../actions/workOrdersActions'
import WorkOrder from "../components/workorders/WorkOrder"
import workOrderSelector from '../selectors/workOrderSelector'
 const WorkOrdersContainer = (props)=>{
    let {loading} = props
    const {id} = useParams()
    const {workOrders,filteredWorkOrders} = props
    const {employees} = props.employees
    const {buildings} = props.buildings

    // useEffect(() => {
    //     props.fetchWorkOrders() 
    //     if (employees.length === 0){
    //        props.fetchEmployees()
    //     }
    //     if (buildings.length === 0){
    //        props.fetchBuildings() 
    //     }
    // },[]);

    const renderWorkOrders = () => {    
        if (workOrders.error_message){ 
                return workOrders.error_message.map((err, i)=>{
                    return <p key={i}>{err}</p>
                })      
        }else if(!loading){
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
              {filteredWorkOrders.map((workOrder,index) => {return (<WorkOrder key={workOrder.id} employees={employees} index={index + 1} workOrder={workOrder} buildings={buildings}/>)}) }
            </tbody>
            </table>
            </>
             ) 
        }
    
    }

    const handleOnclick = (e) => {
       props.workOrderFilter({workOrders, filter_by:e.target.value})
    }

   return(
       <div>
           <div>
              {props.user.admin ?<CreateWorkOrder employees={employees} buildings={buildings}/>:null}
           </div>
           <div>
                <select onChange={handleOnclick} className="form-select my-3 mx-auto"> 
                    <option value='all'>All</option>
                    <option value='closed'>Closed work orders</option>
                    <option value='pending'>Pending Work Orders</option>
                    <option value='expire'>Expire work orders</option>
                </select>
            </div>
           {!id? renderWorkOrders(): null }   
       </div>
   )
}



const mapStateToProps = state => { 
    return {
        employees: state.employees,
        buildings: state.buildings,
        workOrders: state.workOrders.workOrders,
        filteredWorkOrders: workOrderSelector(state.workOrders.workOrders,state.workOrders.filter_by),
        loading: state.workOrders.loading
    }
}
      
// const mapDispatchToProps = dispatch => {
//     return {
//         fetchBuildings: (action) => dispatch(fetchBuildings(action)),
//         fetchEmployees: (action) => dispatch(fetchEmployees(action)),
//         fetchWorkOrders: (action) => dispatch(fetchWorkOrders(action)),
//         workOrderFilter: (action) => dispatch(workOrderFilter(action))   
//     }
// }   
      
export default connect(mapStateToProps, null)(WorkOrdersContainer)