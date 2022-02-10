import React, {useState} from 'react';

import { connect } from 'react-redux';
import {editWorkOrder} from '../../actions/workOrdersActions'
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
const CloseWorkOrder = (props) => {
    let {workOrder} = props

    const [button, setButton] = useState("active_button")

    const workOrderStatus = () => {
        if (workOrder.status){
            return "Open Work Order"
           } else {
            return "Close Work Order"
           }
    }

    const buttonColor = () => {
        if (workOrder.status){
            return "inactive_color"
           } else {
            return "active_color"
           }
    }

    const handleOnClick = (e) => { 
        e.preventDefault()
       if (!workOrder.status){
        props.editWorkOrder({status: true, id: workOrder.id })
        e.target.value = "Open Work Order"
       } else {    
        props.editWorkOrder({status: false, id: workOrder.id })
        e.target.value = "Close Work Order"
       }
    }
    
    return (
        <div>
            <form onSubmit={handleOnClick}>
               <input  className={`work_order_button ${buttonColor()}`} type="submit" value={workOrderStatus()}/>
            </form>
        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        editWorkOrder: (action) => dispatch(editWorkOrder(action))
    }
}   
      
export default connect(null, mapDispatchToProps)(CloseWorkOrder)