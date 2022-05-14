import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions/usersActions'
import SignUp from '../components/users/SignUp'
import { Navigate} from 'react-router-dom'
import {clearErrors} from '../actions/errorsActions'
class UsersContainer extends Component {

  creatingUser = (user)=>{
    this.props.createUser(user)   
  } 
  

  render() {
    return (
      <div>
        { this.props.user.is_login? <Navigate to="/home"/> :<SignUp isLogin={this.props.user.is_login} errors={this.props.errors} creatingUser={this.creatingUser} clearErrors={this.props.clearErrors}/> }
      </div>
    );
  }
};



const mapStateToProps = state => { 
  return {
     user: state.user.user,
     errors: state.errors.errors,
     loading: state.user.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
     createUser: (action) => dispatch(createUser(action)),
     clearErrors: () => dispatch(clearErrors()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
