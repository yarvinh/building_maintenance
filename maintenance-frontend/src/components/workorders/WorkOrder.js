import {Link} from 'react-router-dom';
import '../../styles/styles.css'



const WorkOrder = (props)=>{
    let {workOrder} = props
    const date = () => {
        let date = workOrder.date
        if (date){
            date = new Date(date)
          return date.toDateString()
        }
    }

        return (
           <>
                <tr>
                    <th scope="row">{props.index}</th>
                    <td>  
                        <p>{date()}</p>
                    </td>
                       
                    <td><Link to={`/buildings/${workOrder.building_id}`}><p>{workOrder.building.address}</p> </Link></td>
                    <td>
                        <Link to={`/work_orders/${workOrder.id}`}> 
                          {workOrder.title}
                        </Link>   
                    </td>
                    
                    <td><Link to={`/employees/${workOrder.employee_id}`}><p>{workOrder.employee.name}</p></Link></td>
                    <td>  
                        {workOrder.status ?<p style={{color: "red"}}>Closed</p>: <p style={{color: "green"}}>Pending</p>}
                    </td>
                </tr>
            </>
        )
};



  export default WorkOrder