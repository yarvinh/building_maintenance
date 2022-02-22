import { connect } from 'react-redux';
import {fetchEmployee } from '../../actions/employeesActions'
import {useParams} from 'react-router-dom';
import EditEmployee from "./EditEmployee"
import {workOrderSelector} from '../../selectors/workOrderSelector'
import {getEmployeeWorkOrders} from '../../actions/workOrdersActions'
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';
import '../../styles/styles.css'

const EmployeeDetails = (props)=>{
    const {admin,user} = props.user
    const {id} = useParams()
    let {employees,employeeWorkOrders} = props
    let err = props.employee.error
    let employee = null
    Object.keys(props.employee).length > 0 ? employee = props.employee : employee = employees.find(employee => employee.id.toString() === id)   
    let workOrders = null
    employeeWorkOrders.length > 0 ? workOrders = employeeWorkOrders : workOrders = employee.work_orders
    
        return (
            <>
                <div>
                {employee.id === user.id  || admin ? <EditEmployee/> :null}
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

                <h3 className="center">Work Orders</h3>
               {/* {!err?renderWorkOrders():null}    */}
               <WorkOrdersContainer workOrders={employee.work_orders} user={props.user}/>
            </>
        )

};


const mapStateToProps = state => { 
    return {
       employees: state.employees.employees,
       employee: state.employee.employee,
       employeeWorkOrders: workOrderSelector(state.employeeWorkOrders.employeeWorkOrders,state.employeeWorkOrders.filter_by),
       loading: state.employee.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
       fetchEmployee: (action) => dispatch(fetchEmployee(action)),
       getEmployeeWorkOrders: (action) => dispatch(getEmployeeWorkOrders(action))   
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails)