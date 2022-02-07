import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
// import {deleteReply} from '../../actions/repliesActions'
const Task = (props)=>{
   console.log(props)
   let {task,admin,user} = props

    // const handleOnClick = (e) =>{
    //     props.deleteReply(reply.id)
    // }

    const handleOnChange = (e) =>{
      console.log(e.target.value)
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
                   <input onChange={handleOnChange} type="checkbox"  value={task.id} />
                   <label>{task.task}</label>   
                </div> 
  
                <div>
  
                </div>
              </div>
           </div>
            )    
  }



//   const mapDispatchToProps = dispatch => {
//     return {
//       deleteReply: (action) => dispatch(deleteReply(action))
//     }
//   }
//   export default connect(null, mapDispatchToProps)(Reply)
export default Task