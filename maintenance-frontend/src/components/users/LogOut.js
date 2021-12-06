import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogOut } from '../../actions/usersActions'
import {Navigate} from 'react-router-dom'




class LogOut extends Component {
    
    handleLogOut = () => {
        this.props.fetchLogOut()
    }

    componentDidMount() {
      this.handleLogOut()
    }

    render() {
      return(
        <div>
           {!this.props.user.logged_in? <Navigate to='/home'/>:null}     
        </div>
      );    
    }

};

const mapStateToProps = state => { 
  return {
      user: state.user,
      loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLogOut: () => dispatch(fetchLogOut()),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(LogOut)