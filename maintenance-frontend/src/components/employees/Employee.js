import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import {fetchEmployee } from '../../actions/employeesActions'
import {Link,useParams,useLocation} from 'react-router-dom';
import EditEmployee from "./EditEmployee"
import WorkOrder  from '../workorders/WorkOrder';
import '../../styles/styles.css'


const Employee = (props)=>{
    const path = useLocation()
    const {id} = useParams()
    let err = props.employeeById.employee.error
    useEffect(() => {
        if(id){
            props.fetchEmployee(id) 
        }
    },[props.fetchEmployee]);
    let employee = null
    id? employee = props.employeeById.employee: employee = props.employee
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
           {employee.work_orders &&  employee.work_orders.map((wo,index) => {return <WorkOrder key={wo.id} index={index + 1} workOrder={wo}/>}) }
        </tbody>
        </table>
        )
    }
    if (id){
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
                {workOrders()}     
            </>
        )
    } else {
    return (

        <>
            <tr>
                <td>{props.index}</td>
                <td>
                    <Link to={`/employees/${employee.id}`}>   <p >{employee.name}</p>  </Link>
                </td>
                {err? err.map(e => e):null}
                <td><p>{employee.email}</p></td>
                <td><p>{employee.phone}</p></td>
            </tr>
   
        </>
            
        )
    }
};


const mapStateToProps = state => { 
    return {
       employeeById: state.employee,
       loading: state.employee.loading
    }
  }

const mapDispatchToProps = dispatch => {
    return {
       fetchEmployee: (action) => dispatch(fetchEmployee(action))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Employee)