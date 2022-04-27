import { connect } from 'react-redux';
import {useParams,Navigate} from 'react-router-dom';
import EditEmployee from "./EditEmployee"
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';
import '../../styles/styles.css'


const EmployeeDetails = (props)=>{
    const {admin,user} = props.user
    const {id} = useParams()
    let {employees,workOrders} = props
    const employee =  employees.find(employee => employee.id.toString() === id)
    const employeeWorkOrders = workOrders.filter(wo => wo.employee_id.toString() === id) 
  
    if (employee){
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
                     
                           <p>{employee.email}</p>
                           <p>{employee.phone}</p>
                        </div>    
                    </div>
                </div>

                <h3 className="center">Work Orders</h3>
        
               <WorkOrdersContainer   workOrders={employeeWorkOrders} employee={employee} user={props.user}/>

            </>
        )
    } else {
        return <Navigate to='/employees'/>
    }
};


const mapStateToProps = state => { 
    return {
       employees: state.employees.employees,
       workOrders: state.workOrders.workOrders,
       loading: state.employee.loading
    }
}

  export default connect(mapStateToProps, null)(EmployeeDetails)