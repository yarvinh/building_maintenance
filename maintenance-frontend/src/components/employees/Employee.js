import React, {useEffect } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {fetchEmployee } from '../../actions/employeesActions'
import {useParams} from 'react-router-dom';
import EditEmployee from "./EditEmployee"
import '../../styles/styles.css'


const Employee = (props)=>{
    const {id} = useParams()
    let err = props.employeeById.employee.error
    useEffect(() => {
        if(id){
            props.fetchEmployee(id) 
        }
    },[props.fetchEmployee ]);

    let employee = null
    id? employee = props.employeeById.employee: employee = props.employee


    return (
        <div>
            <div>
              {id?<EditEmployee/>:null}
            </div>
            <div className="container d-flex justify-content-center">
                <div className="card-container mb-3">
                    <div>
                    <Link to={`/employees/${employee.id}`}>  
                        <h3 className="card-header">{employee.name}</h3>
                    </Link>
                    </div>
                    <div className="card-body">
                        {err? err.map(e => e):null}
                        <p>{employee.email}</p>
                        <p>{employee.phone}</p>
                    </div>   
                </div>
            </div>
        </div>
            
        )
 

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