import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {fetchEmployee } from '../../actions/employeesActions'
import {Link,useParams,useLocation} from 'react-router-dom';
import EditEmployee from "./EditEmployee"
import WorkOrder  from '../workorders/WorkOrder';
import {workOrderSelector} from '../../selectors/workOrderSelector'
import {workOrderFilter} from '../../actions/workOrdersActions'
import '../../styles/styles.css'


const EmployeeDetails = (props)=>{
console.log(props)
    const {id} = useParams()
    let {filteredWorkOrders,employees} = props
    let err = props.employee.employee.error
    // let employee = null
    // id? employee = props.employeeById.employee: employee = props.employee
    let employee = employees.find(employee => employee.id.toString() === id)
    console.log(employee)

    const handleOnclick = (e) => {
        const workOrders = employee.work_orders
        props.workOrderFilter({workOrders: workOrders, filter_by: e.target.value})
    }
  
    // useEffect(() => {
    //     if(id){
    //         props.fetchEmployee(id) 
    //     }
    // },[props.fetchEmployee]);

    const workOrders = ()=>{ 
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


    // if (id){
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
                {<h3>Work Orders</h3>}
                <div>
                    <select onChange={handleOnclick} className="form-select my-3 mx-auto"> 
                        <option value='all'>All</option>
                        <option value='closed'>Closed work orders</option>
                        <option value='pending'>Pending Work Orders</option>
                        <option value='expire'>Expire work orders</option>
                    </select>
                </div>
                {!err?workOrders():null}     
            </>
        )
    // } else {
    // return (

        // <>
            {/* <tr>
                <td>{props.index}</td>
                <td>
                    <Link to={`/employees/${employee.id}`}>   <p >{employee.name}</p>  </Link>
                </td>
                {err? err.map(e => e):null}
                <td><p>{employee.email}</p></td>
                <td><p>{employee.phone}</p></td>
            </tr> */}
   
        // </>
            
        // )
    // }
};


const mapStateToProps = state => { 
    // console.log(state)
    return {
       employees: state.employees.employees,
       employee: state.employee,
       filteredWorkOrders: state.employee.employee && workOrderSelector(state.employee.employee.work_orders,state.workOrders.filter_by),
       loading: state.employee.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
       fetchEmployee: (action) => dispatch(fetchEmployee(action)),
       workOrderFilter: (action) => dispatch(workOrderFilter(action))   
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails)