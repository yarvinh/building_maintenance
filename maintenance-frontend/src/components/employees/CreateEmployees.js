import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  createEmployee} from '../../actions/employeesActions'
import '../../styles/styles.css'
// import {Navigate} from 'react-router-dom'




class CreateEmployees extends Component {
    state = {
        employee: {
        name: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        },
        acordion: 'display_accordion', 
        display: 'hide_elements',
    }


    handleOnclick = (e)=>{
        if(this.state.acordion !== 'display_accordion active'){
        this.setState({
          acordion: 'display_accordion active',
          display: 'display_elements',
        })
      }else{
        this.setState({
          acordion: 'display_accordion',
          display: 'hide_elements', 
        })
      }
      }
 
    handleOnsubmit = (e) =>{
        e.preventDefault()
        this.props.createEmployee({employee: this.state.employee})
        this.setState({
           employee: {name: "",
            email: "",
            username: "",
            password: "",
            password_confirmation: "",
          }
         })
    }

    handleOnSubmit = (e) =>{  
        this.setState({
           employee: {...this.state.employee, [e.target.name]: e.target.value,}
        })
    }

    render() {  
      return(
        <div>
            <button onClick={this.handleOnclick} className={this.state.acordion}> Create An Employee</button>
            <div className={this.state.display}>
            <div className="container d-flex justify-content-center align-items-center">
                <form onSubmit={this.handleOnsubmit}>
                    <label>Name:</label>
                    <input onChange={this.handleOnSubmit} id="e_name" name="name" className="form-control" type="text" value={this.state.name}/><br/>
                    <label>Email</label>
                    <input onChange={this.handleOnSubmit} id="e_email" name="email" className="form-control" type="email" value={this.state.email}/><br/>
                    <label>Username:</label>
                    <input onChange={this.handleOnSubmit} id="e_username" name="username" className="form-control" type="text" value={this.state.username}/><br/>
                    <label>Password:</label>
                    <input onChange={this.handleOnSubmit} id="e_password" name="password" className="form-control" type="password" value={this.state.password}/><br/>
                    <label>Confirm Password:</label>
                    <input onChange={this.handleOnSubmit} id="e_confirm_password" name="password_confirmation" className="form-control" type="password" value={this.state.password_confirmation}/><br/>
                    <button type='submit' className="btn btn-primary">Submit</button>
                </form>     
            </div>
            </div>
        </div>
      );    
    }

};

const mapStateToProps = state => { 
  return {
    employees: state.employees,
    loading: state.employees.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEmployee: (action) => dispatch(createEmployee(action)),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(CreateEmployees)