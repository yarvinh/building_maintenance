import React, {useEffect} from 'react';
import { connect } from 'react-redux';
// import { fetchEmployees} from '../actions/employeesActions'
import CreateEmployees from '../components/employees/CreateEmployees'
import Employee from "../components/employees/Employee"
import {useParams} from 'react-router-dom';


const EmployeesContainer = (props) => {
    let {admin} = props.user
    const {employees} = props.employees
    const {id} = useParams()
    // useEffect(() => {
    //     props.fetchEmployees() 
    // },[ props.fetchEmployees ]);
     
    const renderEmployees = () => {   
        if (employees.error_message){ 
                return employees.error_message.map((err, i)=>{
                    return <li key={i}>{err}</li>
                })      
        }else{
            return (
                <>
            <table className="table table-striped" > 
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
            </tr>
            </thead>
            <tbody>
              {employees.map((employee,index) => {return (<Employee key={employee.id} employee={employee} index={index + 1} />)}) }
            </tbody>
            </table>
            </>
             ) 

        }
    }



    return (
        <div> 
            {!id && admin?<CreateEmployees user={props.user} />: null }
            <div>
              {!id? renderEmployees(): null }
            </div>
        </div>
    )
}


const mapStateToProps = state => { 
    return {
       employees: state.employees,
       loading: state.employees.loading
    }
  }

// const mapDispatchToProps = dispatch => {
//     return {
//        fetchEmployees: (action) => dispatch(fetchEmployees(action))
//     }
//   }
  export default connect(mapStateToProps, null)(EmployeesContainer)
  