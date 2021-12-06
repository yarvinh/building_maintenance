import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEmployees } from '../actions/employeesActions'

class EmployeesContainer extends Component {

    componentDidMount(){
        this.props.fetchEmployees()  
    }

    renderEmployees = () => {
       return  this.props.employees.employees.map((emp)=>{
               return (
                   <li key={emp.id}>{emp.name}</li>
               )
           })   
    }

    render = () => {
       
       return (
           <div>
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
  