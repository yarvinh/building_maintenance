import React, {useState,useEffect } from 'react';

import { connect } from 'react-redux';
import {editWorkOrder} from '../../actions/workOrdersActions'
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
const CloseWorkOrder = (props) => {
    let {workOrder} = props

    // const [work, setWork] = useState({
    //     status: true,
    //     title: "12345678",
    //     id: workOrder.id
    // })

    const workOrderStatus = () => {
        let value = ""
        if (workOrder.status){
            return value = "Open Work Order"
           } else {
            return value = "Close Work Order"
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
               <input  className='work_order_button' type="submit" value={workOrderStatus()}/>
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