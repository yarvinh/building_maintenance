import {Link} from 'react-router-dom';
import '../../styles/styles.css'
// import {workOrderStatus} from "../../componentsHelpers/workOrdersHelper"



const Notification = (props)=>{
    let {workOrders} = props
    const acceptedWorkOrders = workOrders.filter(wo=> !wo.accepted)

        return (
          <div className="notifications">
              {acceptedWorkOrders.length > 0?<Link to={'my_work_orders'}>   <p>You Have {acceptedWorkOrders.length} new workOrder{acceptedWorkOrders.length > 1? "s":null}</p>  </Link>:null  } 
          </div>
        )
};



  export default Notification