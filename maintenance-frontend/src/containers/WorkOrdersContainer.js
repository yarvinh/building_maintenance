import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import { connect } from 'react-redux';
import {workOrderFilter} from '../actions/workOrdersActions'
import WorkOrder from "../components/workorders/WorkOrder"
import {workOrderSelector} from '../selectors/workOrderSelector'
//  import {useParams} from 'react-router-dom';
const WorkOrdersContainer = (props)=>{
   
    const {workOrders,myWorkOrders } = props
    console.log(myWorkOrders)
    const {employees} = props.employees
    const {buildings} = props.buildings
    let filteredWorkOrders = null
    myWorkOrders ? filteredWorkOrders = myWorkOrders : filteredWorkOrders = props.filteredWorkOrders
    const renderWorkOrders = () => {  
        if (workOrders.error_message){ 
                return workOrders.error_message.map((err, i)=>{
                    return <p key={i}>{err}</p>
                })      
        }else {
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
              {filteredWorkOrders.map((workOrder,index) => {return (<WorkOrder key={workOrder.id}  index={index + 1} workOrder={workOrder}/>)}) }
            </tbody>
            </table>
            </>
            ) 
        }
    
    }

    const handleOnclick = (e) => {
       props.workOrderFilter({workOrders, filter_by: e.target.value})
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
            {renderWorkOrders()}  
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
      
const mapDispatchToProps = dispatch => {
    return {
        workOrderFilter: (action) => dispatch(workOrderFilter(action))   
    }
}   
      
export default connect(mapStateToProps,mapDispatchToProps  )(WorkOrdersContainer)