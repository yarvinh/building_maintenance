import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  createEmployee} from '../../actions/employeesActions'
import {clearErrors} from '../../actions/errorsActions'
import '../../styles/styles.css'

class CreateEmployees extends Component {
    state = {
        employee: {
        name: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        phone: ""
        },
        acordion: 'display_accordion', 
        display: 'hide_elements',
    }

    componentDidMount(){  
      if (this.props.errors.length > 0){
        this.props.clearErrors()
      }
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
            phone: "",
          }
         })
         if (this.props.errors.length > 0){
          this.props.clearErrors()
        }
    }

    handleOnChange = (e) =>{  
        this.setState({
           employee: {...this.state.employee, [e.target.name]: e.target.value,}
        })
    }

    render() {  
      return(
        <div className="center">
            <button onClick={this.handleOnclick} className={this.state.acordion}> Create An Employee</button>
            <div className={this.state.display}>
            <div className="container d-flex justify-content-center align-items-center">
                <form onSubmit={this.handleOnsubmit}>
                    <label>Name</label>
                    <input onChange={this.handleOnChange}  name="name" className="form-control" type="text" value={this.state.employee.name}/><br/>
                    <label>Phone Number</label>
                    <input onChange={this.handleOnChange} name="phone" className="form-control" type="phone" value={this.state.employee.phone}/><br/>
                    <label>Email</label>
                    <input onChange={this.handleOnChange}  name="email" className="form-control" type="email" value={this.state.employee.email}/><br/>
                    <label>Username:</label>
                    <input onChange={this.handleOnChange}  name="username" className="form-control" type="text" value={this.state.employee.username}/><br/>
                    <label>Password:</label>
                    <input onChange={this.handleOnChange} name="password" className="form-control" type="password" value={this.state.employee.password}/><br/>
                    <label>Confirm Password:</label>
                    <input onChange={this.handleOnChange}  name="password_confirmation" className="form-control" type="password" value={this.state.employee.password_confirmation}/><br/>
                    <button type='submit' className="btn btn-primary">Submit</button>
                </form>    
            </div>
            <br/>
            <div > 
                {this.props.errors.map((e,k) => {return <p key={k}>{e}</p>})}
            </div>  
            </div>
        </div>
      );    
    }

};

const mapStateToProps = state => { 
  return {
    employees: state.employees,
    loading: state.employees.loading,
    errors: state.errors.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEmployee: (action) => dispatch(createEmployee(action)),
    clearErrors: () => dispatch(clearErrors()),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(CreateEmployees)