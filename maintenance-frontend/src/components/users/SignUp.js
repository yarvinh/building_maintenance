import React, {Component } from 'react';
import '../../styles/styles.css'

class SignUp extends Component {
  state = {
    company_name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
  }

  handleOnSubmit = (e) => {
      e.preventDefault()
      this.props.creatingUser({user: this.state})

  }

  handleOnChange = (e) => {
    this.setState({
       [e.target.name]: e.target.value 
    })
  }


  render() {
    return (
      <div>
        <div className="container d-flex justify-content-center align-items-center">
          <form onSubmit={this.handleOnSubmit} className="form">
            <label className="mt-5"> Company Name: </label>
            <input onChange={this.handleOnChange} className="form-control" value={this.state.company_name} name="company_name" type='text'/> <br/>
            <label >Email:</label >
            <input  onChange={this.handleOnChange} className="form-control" value={this.state.email} name="email" type='text'/> <br/>
            <label >Username:</label >
            <input onChange={this.handleOnChange} className="form-control"  value={this.state.username} name="username" type='text'/> <br/>
            <label > Password: </label >
            <input onChange={this.handleOnChange} className="form-control"  value={this.state.password} name="password" type='password'/> <br/>
            <label > Confirm password:</label >
            <input onChange={this.handleOnChange} className="form-control"  value={this.state.password_confirmation} name="password_confirmation" type='password'/> <br/>
            <button type='submit' className="btn btn-primary">Submit</button>
          </form>
          
        </div>
        <br/>
        <br/>
        <div className="center"> 
            {this.props.errors.map((e,k) => {return <p key={k}>{e}</p>})}
        </div>  
      </div>
    );
  }
};

export default SignUp  ;