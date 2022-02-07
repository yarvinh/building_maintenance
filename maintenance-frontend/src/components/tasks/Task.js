import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {changeStatus} from '../../actions/tasksActions'
// import {deleteReply} from '../../actions/repliesActions'
const Task = (props)=>{
//    console.log(props)
   let {task,admin,user,loading} = props

    // const handleOnClick = (e) =>{
    //     props.deleteReply(reply.id)
    // }

    const handleOnChange = (e) =>{
      props.changeStatus(task.id)
    }



    // const deleteReply = ()=>{
    //     if(admin && user.id.toString() === reply.user_id || user.id.toString() === reply.employee_id){
    //        return <button onClick={handleOnClick} className='delete' value={reply.id}>X</button>
    //     }
    // } 

        return (     
          <div className={'tasks'}> 
              <div > 
                <div>
                  {/* {deleteReply()} */}
                  {/* {reply.user? <span >Reply by: {reply.user.company_name} {dateAndTime()}</span>:<span >Reply by: <Link to={`/employees/${reply.employee_id}`}>{reply.employee.name}</Link> {dateAndTime()}</span>} */}
                </div>
                <div className='task'>
                   {task.completed? <input onChange={handleOnChange} type="checkbox"  defaultValue={task.id} defaultChecked="checked"/>: <input onChange={handleOnChange} type="checkbox" defaultValue={task.id}/> }
                   <label>{task.task}</label>   
                </div> 
  
                <div>
  
                </div>
              </div>
           </div>
        )  



  }



  const mapDispatchToProps = dispatch => {
    return {
    //   deleteReply: (action) => dispatch(deleteReply(action))
    changeStatus: (action) => dispatch(changeStatus(action))
    }
  }
  export default connect(null, mapDispatchToProps)(Task)
