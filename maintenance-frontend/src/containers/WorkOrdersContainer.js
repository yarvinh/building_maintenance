import React, {useEffect,useState } from 'react';
import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import { connect } from 'react-redux';
import {workOrderFilter} from '../actions/workOrdersActions'
import WorkOrder from "../components/workorders/WorkOrder"
import {workOrderSelector} from '../selectors/workOrderSelector'
const WorkOrdersContainer = (props)=>{  

    const {employees} = props.employees
    const {buildings} = props.buildings
    const {filteredWorkOrders,workOrders,employee,errors} = props
    const [selector,setSelector] = useState("all")
    const renderWorkOrders = () => {  
     
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
                        <th scope="col">status</th>
                    </tr>
                    </thead>
                    <tbody>
                       {selector !== "all" ? filteredWorkOrders.map((workOrder,index) => {return (<WorkOrder key={workOrder.id}  user={props.user} index={index + 1} workOrder={workOrder}/>)}) :workOrders.map((workOrder,index) => {return (<WorkOrder key={workOrder.id}  user={props.user} index={index + 1} workOrder={workOrder}/>)})  }
                    </tbody>
                    </table>
                </>
            ) 
        // }
    
    }

    const handleOnclick = (e) => {  
        props.workOrderFilter({workOrders, filter_by: e.target.value}) 
        setSelector(e.target.value) 
        
    }

    

   return(
       <div className="center">
           <div>
              {props.user.admin ?<CreateWorkOrder  employees={employees} employee={employee} buildings={buildings}/>:null}
           </div>
           <div>
                <select onChange={handleOnclick} className="form-select my-3 mx-auto"> 
                    <option value='all'>All</option>
                    <option value='today'>Today</option>
                    <option value='closed'>Closed work orders</option>
                    <option value='pending'>Pending Work Orders</option>
                    <option value='expire'>Expire work orders</option>
                </select>
            </div>
            {renderWorkOrders()}  
       </div>
   )
}



const mapStateToProps = state => { 
    return {
        errors: state.workOrders.errors,
        employees: state.employees,
        buildings: state.buildings,
        filteredWorkOrders: workOrderSelector(state.workOrdersToFilter.workOrdersToFilter,state.workOrdersToFilter.filter_by),
        loading: state.workOrders.loading
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        workOrderFilter: (action) => dispatch(workOrderFilter(action))   
    }
}   
      
export default connect(mapStateToProps,mapDispatchToProps  )(WorkOrdersContainer)