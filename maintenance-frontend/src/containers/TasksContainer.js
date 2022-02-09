import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
import Task  from '../components/tasks/Task';
import {fetchTasks} from '../actions/tasksActions'
import CreateTask from '../components/tasks/CreateTask';



const TasksContainer = (props)=>{
  let {tasks,user,admin,workOrder,loading} = props
  useEffect(() => {
    props.fetchTasks(workOrder.id) 
  },[ ]);

  return (
  <div>
      <div >
        <div >
          {!workOrder.status && admin? <CreateTask workOrder={workOrder} admin={admin} user={user}/>: null}
        </div>
        <div>
           {tasks.map((task)=>{return <div key={task.id} ><Task workOrder={workOrder} admin={admin} user={user} task={task}/> </div>})}
        </div>
        </div>
  </div>

  )
}

const mapStateToProps = state => {  
    return {
      tasks: state.tasks.tasks,
      loading: state.tasks.loading,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: (action) => dispatch(fetchTasks(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer)