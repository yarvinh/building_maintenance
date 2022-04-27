
import { connect } from 'react-redux';
import {Link,useParams,Navigate} from 'react-router-dom';
import EditWorkOrder from "./EditWorkOrder"
import CommentsContainer from '../../containers/CommentsContainer'
import '../../styles/styles.css'
import CloseWorkOrder from './CloseWorkOrder';
import TasksContainer from '../../containers/TasksContainer';





const WorkOrderDetails = (props)=>{ 
    const {id} = useParams()
    let {workOrders} = props
    let {buildings,employees} = props
  
    const workOrder = workOrders.find(workOrder => workOrder.id.toString() === id)
    const date = () => {
        let date = workOrder.date
        if (date){
            date = new Date(date)
          return date.toDateString()
        }
    }

    let {user} = props.user
    let {admin} = props.user 
    if (workOrder){
    return (
        <div> 
            <div className="center"> 
            {workOrder.employee_id === user.id  || admin ?<EditWorkOrder buildings={buildings} employees={employees} workOrder={workOrder}/>:null}
            </div> 

            <div className="container d-flex justify-content-center"> 
                <div className="card-container mb-3">
                    <div className="card-header">
                        <h4>{date()}</h4>
                        {workOrder.employee?<Link to={`/employees/${workOrder.employee.id}`}><p>{workOrder.employee.name}</p></Link>:null}
                        {workOrder.building?<Link to={`/buildings/${workOrder.building.id}`}><p>{workOrder.building.address}</p> </Link> :null}
                        <p>Unit: {workOrder.unit}</p>
                        {workOrder.employee?<p>{workOrder.building.super_name}</p>:null}
                        {workOrder.employee?<p>{workOrder.building.phone_number}</p>:null} 
                        <div className="center"> 
                           {workOrder.employee_id === user.id || admin ? <CloseWorkOrder workOrder={workOrder}/>:null}  
                        </div>    
                    </div>

                    <div className="card-body">
                      <div>
                        <h3>Job Title: {workOrder.title}</h3> 
                      </div>
                      <div>
                          <TasksContainer workOrder={workOrder} user={user} admin={admin}/>
                      </div>      
                    </div> 
                </div>
            </div> 
            <div>
                {user && Object.keys(workOrder).length > 0? <CommentsContainer  user={user} admin={admin}/>:null}
            </div>
        </div>
    )
    } else {
        return <Navigate to='/work_orders'/>
    }
};


const mapStateToProps = state => { 
    return {
       workOrders: state.workOrders.workOrders,
       loading: state.workOrder.loading
    }
  }

  export default connect(mapStateToProps ,null)(WorkOrderDetails)
