import { connect } from 'react-redux';
// import {Link} from 'react-router-dom';
import {changeStatus} from '../../actions/tasksActions'
// import WorkOrder from '../workorders/WorkOrder';
import {deleteTask} from '../../actions/tasksActions'
const Task = (props)=>{
//    console.log(props)
   let {task,admin,user,workOrder,loading} = props


    const handleOnClick = (e) =>{
        props.deleteTask(task.id)
    }

    const handleOnChange = (e) =>{
        if (!workOrder.status){
          props.changeStatus(task.id)
        } else {
            e.target.checked = true
        }
    }

        return (     
          <div className={'tasks'}> 
              <div > 
                <div className='task'>
                   {task.completed? <input onChange={handleOnChange} type="checkbox"  defaultValue={task.id} defaultChecked="checked"/>: <input onChange={handleOnChange} type="checkbox" defaultValue={task.id}/> }
                   <label>{task.task}</label>  
                   {admin && !workOrder.status ? <i onClick={handleOnClick} className="fa-solid fa-trash-can delete-task"></i>:null} 
                </div> 
              </div>
           </div>
        )  



  }



  const mapDispatchToProps = dispatch => {
    return {
    deleteTask: (action) => dispatch(deleteTask(action)),
    changeStatus: (action) => dispatch(changeStatus(action))
    }
  }
  export default connect(null, mapDispatchToProps)(Task)
