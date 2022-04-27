import { workOrderSelector } from "../selectors/workOrderSelector";
import WorkOrder from "./workorders/WorkOrder";
import CreateWorkOrder from "./workorders/CreateWorkOrder"
import React, {useState } from 'react';
import { connect } from 'react-redux';
// import '../../styles/styles.css'

const Home = (props)=>{
    const {workOrders,user,employees,buildings } = props
    const pendingWorkOrders = workOrderSelector(workOrders,"pending")
    const [acordion,setAcordion] = useState({
        acordion: 'display_accordion', 
        display: 'hide_elements',
    })
 
    const handleOnclick = (e)=>{  
      if(acordion.acordion !== 'display_accordion active'){
        setAcordion({
          acordion: 'display_accordion active',
          display: 'display_elements',
        })
      }else{
        setAcordion({
          acordion: 'display_accordion',
          display: 'hide_elements', 
        })
      }
    }


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
                       { pendingWorkOrders.map((workOrder,index) => {return (<WorkOrder key={workOrder.id}  user={props.user} index={index + 1} workOrder={workOrder}/>)})}
                    </tbody>
                    </table>
                </>
            ) 
    
    }
    return (
        <div>
            <button onClick={handleOnclick} className={acordion.acordion}> Pending Work Orders</button>
            <div className={acordion.display}>
              {renderWorkOrders() }
            </div>
            <div className="center">
              {user.admin ?<CreateWorkOrder employees={employees}  buildings={buildings}/>:null}
           </div>
        </div>
    )
}
const mapStateToProps = state => { 
    return {
        employees: state.employees.employees,
        buildings: state.buildings.buildings,
        loading: state.workOrders.loading
    }
}
      

export default connect(mapStateToProps,null)(Home)