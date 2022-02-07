import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
// import {createComment,fetchComments} from '../actions/commentsActions'
// import {Link,useParams,useLocation} from 'react-router-dom';
import Task  from '../components/tasks/Task';
import {fetchTasks} from '../actions/tasksActions'
import CreateTask from '../components/tasks/CreateTask';



const TasksContainer = (props)=>{
//   const [accordion, setAccordion] = useState({
//     accordion: 'replies_accordion',
//     displayAccordion: 'hide_replies',

//   })



  let {tasks,user,admin,workOrder,loading} = props

  useEffect(() => {
    props.fetchTasks(workOrder.id) 
  },[ ]);

//   const handleOnclickReply = (e)=>{
//     if(accordion.accordion !== 'replies_accordion active'){
//     setAccordion({
//       accordion: 'replies_accordion active',
//       displayAccordion: 'display_replies'
//     })
//   }else{
//     setAccordion({
//       accordion: 'replies_accordion',
//       displayAccordion: 'hide_replies'
//     })
//   }
//   }


  
  return (
  <div>
      <div >
        <div >
          <CreateTask workOrder={workOrder} admin={admin} user={user}/>
        </div>
        <div>
           {tasks.map((task)=>{return <div key={task.id} ><Task admin={admin} user={user} task={task}/> </div>})}
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