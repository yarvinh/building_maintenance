import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../actions/employeesActions'
import CreateEmployees from '../components/employees/CreateEmployees'

class EmployeesContainer extends Component {

    componentDidMount(){
        this.props.fetchEmployees()  
    }

    renderEmployees = () => {
        if (this.props.employees.employees.error_message){
           
                return this.props.employees.employees.error_message.map((err, i)=>{
                    return <li key={i}>{err}</li>
                })
                
            
        }else{
            return  this.props.employees.employees.map((emp)=>{
               return (
                   <li key={emp.id}>{emp.name}</li>
               )
           })   
        }
 
    }

    render = () => {
       return (
           <div>
               <div>
                   <CreateEmployees user={this.props.user} />
               </div>
               <ul>{this.renderEmployees()}</ul>
           </div>
       )
    }


}

const mapStateToProps = state => { 
    return {
       employees: state.employees,
       loading: state.employees.loading
    }
  }

const mapDispatchToProps = dispatch => {
    return {
       fetchEmployees: (action) => dispatch(fetchEmployees(action))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer)
  