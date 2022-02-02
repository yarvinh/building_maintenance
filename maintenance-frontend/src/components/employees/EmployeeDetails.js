// import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {fetchEmployee } from '../../actions/employeesActions'
import {Link,useParams} from 'react-router-dom';
import EditEmployee from "./EditEmployee"
import WorkOrder  from '../workorders/WorkOrder';
// import {workOrderSelector} from '../../selectors/workOrderSelector'
import {getEmployeeWorkOrders} from '../../actions/workOrdersActions'

import '../../styles/styles.css'
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';
// import WorkOrdersContainer from '../../containers/WorkOrdersContainer';


const EmployeeDetails = (props)=>{
    const {id} = useParams()
    let {employees,user} = props
    let err = props.employee.employee.error
    let employee = employees.find(employee => employee.id.toString() === id)
    let workOrders = employee.work_orders

    // const handleOnclick = (e) => {
    //     props.getEmployeeWorkOrders({workOrders, filter_by: e.target.value})
    // }
  
    const renderWorkOrders = ()=>{ 
       return(
        <table className="table table-striped" > 
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Due Date</th>
            <th scope="col">Address</th>
            <th scope="col">Summary</th>
            <th scope="col">Assigned </th>
        </tr>
        </thead>
        <tbody>
           {Object.keys(employee).length > 0 &&  employee.work_orders.map((wo,index) => {return <WorkOrder employee={employee} key={wo.id} index={index + 1} workOrder={wo}/>}) }
        </tbody>
        </table>
        )
    }

        return (
            <>
                <div>
                  {<EditEmployee/>}
                </div>
                <div className="container d-flex justify-content-center">
                    <div className="card-container mb-3"> 
                        <div>
                           <h3 className="card-header">{employee.name}</h3>
                        </div> 
                        <div className="card-body">
                           {err? err.map(e => e):null}
                           <p>{employee.email}</p>
                           <p>{employee.phone}</p>
                        </div>    
                    </div>
                </div>
                <WorkOrdersContainer employeeWorkOrders={workOrders} user={user}/>
                {/* <h3>Work Orders</h3>
                <div>
                    <select onChange={handleOnclick} className="form-select my-3 mx-auto"> 
                        <option value='all'>All</option>
                        <option value='closed'>Closed work orders</option>
                        <option value='pending'>Pending Work Orders</option>
                        <option value='expire'>Expire work orders</option>
                    </select>
                </div> */}
                {/* {!err?renderWorkOrders():null}    */}
            </>
        )

};


const mapStateToProps = state => { 
    return {
       employees: state.employees.employees,
       employee: state.employee,
    //    filteredWorkOrders: workOrderSelector(state.employeeWorkOrders.employeeWorkOrders,state.employeeWorkOrders.filter_by),
       loading: state.employee.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
       fetchEmployee: (action) => dispatch(fetchEmployee(action)),
    //    getEmployeeWorkOrders: (action) => dispatch(getEmployeeWorkOrders(action))   
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails)