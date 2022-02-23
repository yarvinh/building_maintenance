import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {workOrderStatus} from "../../componentsHelpers/workOrdersHelper"
import {editWorkOrder} from '../../actions/workOrdersActions'

const WorkOrder = (props)=>{
    let {workOrder} = props
    const {user,admin} = props.user
    const date = () => {
        let date = workOrder.date
        if (date){
            date = new Date(date)
          return date.toDateString()
        }
    }

    
    const handleOnClick=(e)=>{
        if (!workOrder.accepted && user.id === workOrder.employee_id){
          props.editWorkOrder({accepted: true, id: workOrder.id })
        }
        
    }
    let accepted = null
    !workOrder.accepted && !admin && workOrder.employee_id === user.id ? accepted =  "notifications"  : accepted = "accepted"
 
        return (
           <>
                <tr className={accepted}>
                    <th scope="row">{props.index}</th>
                    <td>  
                        <p>{date()}</p>
                    </td>
                       
                    <td><Link to={`/buildings/${workOrder.building_id}`}><p>{workOrder.building.address}</p> </Link></td>
                    <td>
                        <Link to={`/work_orders/${workOrder.id}`}> 
                          <span onClick={handleOnClick}>{workOrder.title}</span>
                        </Link>   
                    </td>
                    
                    <td><Link to={`/employees/${workOrder.employee_id}`}><p>{workOrder.employee.name}</p></Link></td>
                    <td>  
                        {workOrderStatus(workOrder)}
                    </td>
                </tr>
            </>
        )
};




const mapDispatchToProps = dispatch => {
    return {
        editWorkOrder: (action) => dispatch(editWorkOrder(action)),
    }
}   
      
export default connect(null, mapDispatchToProps)(WorkOrder)