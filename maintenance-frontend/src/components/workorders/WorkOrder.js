import React, {useEffect } from 'react';
// import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {Link,useParams,useLocation} from 'react-router-dom';
import {fetchWorkOrder} from  '../../actions/workOrdersActions'
import EditWorkOrder from "./EditWorkOrder"
import '../../styles/styles.css'
// import { fetchWorkOrder } from '../../actions/buildingsActions';


const WorkOrder = (props)=>{
    
    const {id} = useParams()
    const {pathname} = useLocation()
    let workOrder = null
    pathname === `/work_orders/${id}`? workOrder = props.workOrderById.workOrder: workOrder = props.workOrder
    
    let {buildings,employees} = props
    let err =  props.workOrderById.workOrder.error
    useEffect(() => {
        if(pathname === `/work_orders/${id}`){
            props.fetchWorkOrder(id) 
        }
    },[]);
    const date = ()=>{
        let date = workOrder.date
        if (date){
            date = new Date(date)
          return date.toDateString()
        }
    }
   
    if(pathname === `/work_orders/${id}`){
        return (
            <div> 
                <div> 
                  {id && workOrder.employee?<EditWorkOrder buildings={buildings} employees={employees} workOrder={workOrder}/>:null} 
                </div> 

                <div className="container d-flex justify-content-center"> 
                    <div className="card-container mb-3">
                        <div className="card-header">
                            <h4>{date()}</h4>
                            {workOrder.employee?<Link to={`/employees/${workOrder.employee.id}`}><p>{workOrder.employee.name}</p></Link>:null}
                            {workOrder.building?<Link to={`/buildings/${workOrder.building.id}`}><p>{workOrder.building.address}</p> </Link> :null}
                            {workOrder.employee?<p>{workOrder.building.super_name}</p>:null}
                            {workOrder.employee?<p>{workOrder.building.phone_number}</p>:null}        
                        </div>

                        <div className="card-body">
                          <div>
                            {err? err.map(e => e):null}
                          </div>
                          <div>
                            <p>{workOrder.task}</p>
                          </div>
                        </div> 
                    </div>
                </div> 
            </div>
        )
    } else {
        return (
           <>
                <tr>
                    <th scope="row">{props.index}</th>
                    <td>  
                        <p>{date()}</p>
                    </td>
                       
                    <td><Link to={`/buildings/${workOrder.building.id}`}><p>{workOrder.building.address}</p> </Link></td>
                    <td>
                        <Link to={`/work_orders/${workOrder.id}`}> 
                          {workOrder.title}
                        </Link>   
                    </td>
                    
                    <td><Link to={`/employees/${workOrder.employee.id}`}><p>{workOrder.employee.name}</p></Link></td>
                </tr>
            </>
        )
    }
};


const mapStateToProps = state => { 
    return {
       workOrderById: state.workOrder,
       loading: state.workOrder.loading
    }
  }

const mapDispatchToProps = dispatch => {
    return {
       fetchWorkOrder: (action) => dispatch(fetchWorkOrder(action))
    }
  }
  export default connect(mapStateToProps , mapDispatchToProps)(WorkOrder)