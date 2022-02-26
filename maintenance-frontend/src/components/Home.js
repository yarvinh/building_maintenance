import { workOrderSelector } from "../selectors/workOrderSelector";
import WorkOrder from "./workorders/WorkOrder";
import React, {useState } from 'react';
// import '../../styles/styles.css'

const Home = (props)=>{
    const {workOrders } = props
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
    
    }
    return (
        <div>

            <button onClick={handleOnclick} className={acordion.acordion}> Pending Work Orders</button>
            <div className={acordion.display}>
              {renderWorkOrders() }
            </div>
        </div>
    )
}
export default Home ;