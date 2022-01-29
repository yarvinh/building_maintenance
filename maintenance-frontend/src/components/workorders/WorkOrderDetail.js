import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {Link,useParams} from 'react-router-dom';
import {fetchWorkOrder} from  '../../actions/workOrdersActions'
import EditWorkOrder from "./EditWorkOrder"
import CommentsContainer from '../../containers/CommentsContainer'
import '../../styles/styles.css'
import CloseWorkOrder from './CloseWorkOrder';


const WorkOrderDatail = (props)=>{ 

    const {loading,employee} = props
    const {id} = useParams()
    let {workOrder} = props
    let {buildings,employees} = props

    useEffect(() => {
        if(id && !employee){
            props.fetchWorkOrder(id) 
        }
    },[]);

    const date = () => {
        let date = workOrder.date
        if (date){
            date = new Date(date)
          return date.toDateString()
        }
    }

    let {user} = props.user
    let {admin} = props.user
  
       
    return (
        <div> 
            <div> 
              {id && workOrder.employee && props.user.admin?<EditWorkOrder buildings={buildings} employees={employees} workOrder={workOrder}/>:null} 
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
                        {/* {err? err.map(e => e):null} */}
                      </div>
                      <div>
                        <h3>Job Title: {workOrder.title}</h3>
                        <p>{workOrder.task}</p>
                      </div>
                      {workOrder.employee_id === user.id  || workOrder.user_id === user.id ? <CloseWorkOrder workOrder={workOrder}/>:null}
                    </div> 
                </div>
            </div> 
            <div>
                {user && Object.keys(workOrder).length > 0? <CommentsContainer  user={user} admin={admin}/>:null}
            </div>
        </div>
    )
};


const mapStateToProps = state => { 
    console.log(state)
    return {
       workOrder: state.workOrder.workOrder,
       loading: state.workOrder.loading
    }
  }

const mapDispatchToProps = dispatch => {
    return {
       fetchWorkOrder: (action) => dispatch(fetchWorkOrder(action))
    }
  }
  export default connect(mapStateToProps , mapDispatchToProps)(WorkOrderDatail)