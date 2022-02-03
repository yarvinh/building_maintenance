import { connect } from 'react-redux';
import {fetchEmployee } from '../../actions/employeesActions'
import {Link,useParams} from 'react-router-dom';
import {workOrderFilter} from '../../actions/workOrdersActions'
import '../../styles/styles.css'


const Employee = (props)=>{

    const {id} = useParams()
    let {employees} = props
    let err = props.employeeById.employee.error
    let employee = null
    id? employee = props.employeeById.employee: employee = props.employee
    let test = employees.find(employee => employee.id.toString() === id)
   
    
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
};


const mapStateToProps = state => { 

    return {
       employees: state.employees.employees,
       employeeById: state.employee,
       loading: state.employee.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
       fetchEmployee: (action) => dispatch(fetchEmployee(action)),
       workOrderFilter: (action) => dispatch(workOrderFilter(action))   
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Employee)