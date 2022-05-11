import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {workOrderStatus} from "../../componentsHelpers/workOrdersHelper"
import {editWorkOrder,deleteWorkOrder} from '../../actions/workOrdersActions'

const WorkOrder = (props)=>{
    let {workOrder} = props
    const {user,admin} = props.user
    const date = () => {
        let date = workOrder.date
        
        if (date){
            date = new Date(date.split('-').join("-").split("T")[0].replace(/-/g, '\/'))
          return date.toDateString()
        }
    }

    
    const handleOnClick=(e)=>{  

        if (!workOrder.accepted && user.id === workOrder.employee_id && !admin){

          props.editWorkOrder({accepted: true, id: workOrder.id })
        }
        if(e.target.name === 'delete'){
          const confirmBox = window.confirm(
            "Are you sure you want to delete this work order?  you will lose all comments and ryplies on this work Order!"     
          )
          if (confirmBox === true) {
              props.deleteWorkOrder(workOrder.id)  
          }
        }
           
        
    }
    let accepted = null
    !workOrder.accepted && !admin && workOrder.employee_id === user.id ? accepted =  "notifications"  : accepted = "accepted"
    if (workOrder && workOrder.employee && workOrder.building){
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
                    <td>
                      {admin ? <button onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "  name='delete'></button>:null} 
                    </td>
                </tr>
            </>
        )
    }else{
        return (
            null
        )
    }
};




const mapDispatchToProps = dispatch => {
    return {
        editWorkOrder: (action) => dispatch(editWorkOrder(action)),
        deleteWorkOrder: (action) => dispatch(deleteWorkOrder(action)),
    }
}   
      


export default connect(null, mapDispatchToProps)(WorkOrder)