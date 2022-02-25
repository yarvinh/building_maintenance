
import './App.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import LogOut from './components/users/LogOut'
import LogIn from './components/users/LogIn'
import EmployeeDetails from './components/employees/EmployeeDetails'
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
import Home from './components/Home';
import Notification from './components/workorders/Notifications';

class App extends Component{
  fetchingInf = ()=>{
    this.props.fetchCurrentUser()  
    this.props.fetchBuildings()
    this.props.fetchEmployees()
    this.props.fetchWorkOrders()
  }

  componentDidMount(){  
    this.fetchingInf()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.user.is_login !== this.props.user.is_login && prevProps.user.is_login  !== undefined){
      this.fetchingInf()
    }

  }

  userWorkOrders=()=>{
    if (this.props.workOrders.error_message){
      return []
    } else {
      return this.props.workOrders.filter(wo => wo.employee_id == this.props.user.user.id)
    }
  }

  loading = () => {
    return this.props.loading
  }

    render = () => {
      this.loading()
      return (
        <BrowserRouter >
          <div className="App">
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary bg-lightnavbar">
              <div className="container-fluid">
              {this.props.user.user? <p className="navbar-brand" >Welcome {this.props.user.user.name} </p>:null}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                      {this.props.user.is_login? <Link to='/' className="nav-link custom-nav-link">Home</Link>: null}
                    </li>
                    <li className="nav-item">
                    {this.props.user.is_login? <Link to='/buildings' className="nav-link custom-nav-link">Buildings</Link>: null}
                    </li>
                    <li className="nav-item">
                      {this.props.user.is_login? <Link to='/work_orders' className="nav-link custom-nav-link">Work Orders</Link>: null}
                    </li>
                    <li className="nav-item">
                       {this.props.user.is_login && !this.props.user.admin? <Link to='/my_work_orders' className="nav-link custom-nav-link">My Work Orders</Link>: null}
                    </li>
                    <li className="nav-item">
                      {this.props.user.is_login? <Link to='/employees' className="nav-link custom-nav-link">employees</Link>: null}
                    </li>
                    <li className="nav-item">
                      {!this.props.user.is_login? <Link to='/signup' className="nav-link custom-nav-link">Sign Up</Link>: null}
                    </li>
                    <li className="nav-item">
                      {!this.props.user.is_login? <Link to='/login' className="nav-link custom-nav-link">Log In</Link>:  <Link to='/signout' className="nav-link custom-nav-link">Sign Out</Link>  }
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {this.props.user.is_login && !this.props.user.admin && this.props.user.user.work_orders?<Notification workOrders={this.userWorkOrders()}/>:null }
            

            <Routes>
                <Route exact path='/' element={<Home workOrders={this.userWorkOrders()} user={this.props.user}/>} />
                <Route exact path='/login' element={<LogIn/>} />
                <Route exact path='/signout' element={<LogOut/>}/>
                <Route exact path='/signup'  element={<UsersContainer />}/>
                <Route exact path='/employees'  element={<EmployeesContainer user={this.props.user}/>}/>
                <Route exact path='/buildings'  element={<BuildingsContainer user={this.props.user}/>}/>
                <Route exact path='/work_orders'  element={<WorkOdersContainer workOrders={this.props.workOrders} user={this.props.user}/>}/>
                <Route exact path='/login' /> 
                {this.props.employees.length > 0 && this.props.user.user?<Route exact path='/employees/:id' element={<EmployeeDetails user={this.props.user}/>}/>: null}
                {this.props.user.is_login && !this.props.user.admin? <Route exact path='/my_work_orders' element={<WorkOdersContainer workOrders={this.userWorkOrders()} user={this.props.user}/>}/>: null}
                <Route exact path='/buildings/:id' element={<Building user={this.props.user}/>}/>
                {this.props.workOrders.length > 0 && this.props.user.is_login? <Route exact path='/work_orders/:id' element={<WorkOrderDetail  user={this.props.user}/>}/>: null}
            </Routes>
 
          </div>
          
        </BrowserRouter>
            
    );
  }
}


const mapStateToProps = state => { 
  return {
    employees: state.employees.employees,
    user: state.user.user,
    workOrders: state.workOrders.workOrders,
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

