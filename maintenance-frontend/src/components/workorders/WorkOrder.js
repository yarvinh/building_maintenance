import React, {useEffect } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchWorkOrder} from  '../../actions/workOrdersActions'
// import EditWorkOrder from "./WorkOrder"
import '../../styles/styles.css'
// import { fetchWorkOrder } from '../../actions/buildingsActions';


const WorkOrder = (props)=>{
    const {id} = useParams()
    let err = props.workOrderById.workOrder.error
    useEffect(() => {
        if(id){
            props.fetchWorkOrder(id) 
        }
    },[]);
 
    let workOrder = null
    id? workOrder = props.workOrderById.workOrder: workOrder = props.workOrder
   
    const date = ()=>{
        let date = workOrder.date
        if (date){
            date = new Date(date)
          return date.toDateString()
        }
   
    }
    return (
        <div>
            <div>
              {/* {id?<EditWorkOrder/>:null} */}
            </div>
            <div className="container d-flex justify-content-center">
                <div className="card-container mb-3">
                    <div>
                    <Link to={`/work_orders/${workOrder.id}`}>  
                        <h3 className="card-header">{date()}</h3>
                    </Link>
                    </div>
                    <div className="card-body">
                       <div>
                           {err? err.map(e => e):null}
                           {workOrder.employee?<Link to={`/employees/${workOrder.employee.id}`}><p>{workOrder.employee.name}</p></Link>:null}
                           {workOrder.building?<Link to={`/buildings/${workOrder.building.id}`}><p>{workOrder.building.address}</p> </Link>:null}
                       </div>
                       <div>
                           {id? <p>{workOrder.task}</p>: null}
                       </div>
                       
                    </div>   
                </div>
            </div>
        </div>
            
        )
 

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