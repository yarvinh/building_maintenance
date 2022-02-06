import React, {useState } from 'react';
import { connect } from 'react-redux';
import {createTask} from '../../actions/tasksActions'
import {useParams} from 'react-router-dom';



const CreateTask = (props) => {

    const {id} = useParams()
    let {workOrder} = props

    let placeholderObj = {task: "Add a task"}
    const [task, setTask] = useState({
        task: "",
        workOrder_id: workOrder.id
    })

    const [placeholder,setPlacehoder] = useState(placeholderObj)

    const handleOnChange = (e) => {
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }



    const handleOnKeyUp = (e) => {
        e.preventDefault()
        if (e.code  === 'Enter'){
            props.createTask({task})
            setTask({
                ...task,
                task: ""
            })
            setPlacehoder({
                task: "Add a task",
            })
            e.target.style.height = "30px"
        }
      }


    
    return (
        <div>
            <form onKeyUp={handleOnKeyUp}>
               <textarea  onChange={handleOnChange} className='auto_height_for_reply' placeholder={placeholder.task} name="task" type="text" value={task.task} style={{height: "30px"}}/><br/>
            </form>
        </div>
    )
}


  const mapDispatchToProps = dispatch => {
    return {
        createTask: (action) => dispatch(createTask(action))
    }
  }
  export default connect(null, mapDispatchToProps)(CreateTask)