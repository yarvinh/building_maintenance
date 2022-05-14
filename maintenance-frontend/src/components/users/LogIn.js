import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogIn } from '../../actions/usersActions'
import '../../styles/styles.css'
import {Navigate} from 'react-router-dom'


class LogIn extends Component {
    state = {
       username: '',
       password: '',
       admin: false,
    }

    redirect = ()=>{
      return <Navigate to='/home' /> 
    }

    handleOnChangePassword = (e) => {
      
        this.setState({
            password: e.target.value
        })
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })

    }

    handleOnChangeAdmin = (e) => {
      this.setState({
          admin: true,
      })

  }

    handleOnSubmit = (e) => {
       e.preventDefault()
       if (this.state.admin){
         this.props.fetchLogIn(this.state,'http://localhost:3000/admins_login')  
       } else {
        this.props.fetchLogIn(this.state,'http://localhost:3000/employees_login') 
       }
    }

  render() {
    return(
      <div>
      <div className="container h-100  d-flex  justify-content-center align-items-center">
        <form onSubmit={this.handleOnSubmit} className="form">
            <label className="mt-3 form-label">Admin</label>
            <input  onChange={this.handleOnChangeAdmin} type="checkbox" value={this.state.username}/> 
            <br/>
            <label className="mt-3 form-label">Username</label>
            <input className="form-control" onChange={this.handleOnChangeUsername} type="text" value={this.state.username}/>
            <label className="form-label">Password</label >
            <input className="form-control" onChange={this.handleOnChangePassword } type="password" value={this.state.password}/>
          <button  className="my-4 btn btn-primary" type="submit">Login</button>
        </form>
         {this.props.user.user.is_login? this.redirect():null}
      
      </div>
      {this.props.errors.map((e,k) => {return <p key={k}>{e}</p>})}
      </div>
    );

    
  }

};



const mapStateToProps = state => { 
  return {
    errors: state.errors.errors,
    user: state.user,
    loading: state.user.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
    fetchLogIn: (action,url) => dispatch(fetchLogIn(action,url)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)