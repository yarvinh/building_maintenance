import { connect } from 'react-redux';
import {changeStatus} from '../../actions/tasksActions'
import {deleteTask} from '../../actions/tasksActions'
const Task = (props)=>{
   let {task,admin,workOrder,loading} = props
   let disable = false

   if(workOrder.status){
    disable = true
   }

    const handleOnClick = (e) =>{
        props.deleteTask(task.id)
    }
    
    const handleOnChange = (e) =>{
        if (!workOrder.status ){
          props.changeStatus(task.id)
        } else if(workOrder.status) {
        }
    }

        return (     
          <div className={'tasks'}> 
              <div > 
                <div className='task'>
                   {task.completed? <input onChange={handleOnChange} type="checkbox"  defaultValue={task.id} defaultChecked="checked"  disabled={disable} />: <input onChange={handleOnChange} type="checkbox" defaultValue={task.id}  disabled={disable} /> }
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
