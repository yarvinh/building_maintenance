
import './App.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import LogOut from './components/users/LogOut'
import LogIn from './components/users/LogIn'
import Employee from './components/employees/Employee'
import Building from './components/buildings/Building'
import EmployeesContainer from './containers/EmployeesContainer'
import WorkOdersContainer from './containers/WorkOrdersContainer'
import BuildingsContainer from './containers/BuildingsContainer'
import { fetchCurrentUser } from './actions/usersActions'
import { fetchEmployees} from './actions/employeesActions'
import { fetchWorkOrders} from './actions/workOrdersActions'
import UsersContainer from './containers/UsersContainer'
import { fetchBuildings} from './actions/buildingsActions'
import './styles/styles.css'
import WorkOrderDetail from './components/workorders/WorkOrderDetail';


class App extends Component{

  fetchCurrentUser = () => {
    this.props.fetchCurrentUser()  
  }
  componentDidMount(){
    this.fetchCurrentUser()  
    this.props.fetchBuildings()
    this.props.fetchEmployees()
    this.props.fetchWorkOrders()
  }

    render = () => {
      return (
        <BrowserRouter >
        <div className="App">
            <nav  className="navbar navbar-dark bg-primary">
          <div className="container"> 
              <p className="navbar-brand">Maintenance</p>
              {this.props.user.is_login? <Link to='/buildings' className="nav-link custom-nav-link">Buildings</Link>: null}
              {this.props.user.is_login? <Link to='/work_orders' className="nav-link custom-nav-link">Work Orders</Link>: null}
              {this.props.user.is_login? <Link to='/employees' className="nav-link custom-nav-link">employees</Link>: null}
              {!this.props.user.is_login? <Link to='/signup' className="nav-link custom-nav-link">Sign Up</Link>: null}
              {!this.props.user.is_login? <Link to='/login' className="nav-link custom-nav-link">Log In</Link>:  <Link to='/signout' className="nav-link custom-nav-link">Sign Out</Link>  }
          </div>    
        </nav>
        <Routes>
            <Route exact path='/login' element={<LogIn/>} />
            <Route exact path='/signout' element={<LogOut/>}/>
            <Route exact path='/signup'  element={<UsersContainer />}/>
            <Route exact path='/employees'  element={<EmployeesContainer user={this.props.user}/>}/>
            <Route exact path='/buildings'  element={<BuildingsContainer user={this.props.user}/>}/>
            <Route exact path='/work_orders'  element={<WorkOdersContainer user={this.props.user}/>}/>
            <Route exact path='/login' /> 
            <Route exact path='/employees/:id' element={<Employee user={this.props.user}/>}/>
            <Route exact path='/buildings/:id' element={<Building user={this.props.user}/>}/>
            {Object.keys(this.props.user).length > 0?<Route exact path='/work_orders/:id' element={<WorkOrderDetail user={this.props.user}/>}/>: null}
          </Routes>
        </div>
        </BrowserRouter>
            
    );
  }
}


const mapStateToProps = state => { 
  return {
    user: state.user.user,
    loading: state.user.loading
  }
}
 
 

const mapDispatchToProps = dispatch => {
  return {
    fetchCurrentUser: (action) => dispatch(fetchCurrentUser(action)),
    fetchBuildings: (action) => dispatch(fetchBuildings(action)),
    fetchEmployees: (action) => dispatch(fetchEmployees(action)),
    fetchWorkOrders: (action) => dispatch(fetchWorkOrders(action)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

