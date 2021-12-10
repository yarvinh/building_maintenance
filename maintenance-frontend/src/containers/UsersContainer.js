import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../actions/usersActions'
import SignUp from '../components/users/SignUp'
import { Navigate} from 'react-router-dom'
class UsersContainer extends Component {

  creatingUser = (user)=>{
    this.props.createUser(user)   
  } 
  

  render() {
    return (
      <div>
        { this.props.user.is_login? <Navigate to="/home"/> :<SignUp isLogin={this.props.user.is_login} errorMessages={this.props.user.messages} creatingUser={this.creatingUser}/> }
      </div>
    );
  }
};



const mapStateToProps = state => { 
  return {
     user: state.user.user,
     loading: state.user.loading
  }
}
 

const mapDispatchToProps = dispatch => {
  return {
     createUser: (action) => dispatch(createUser(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
