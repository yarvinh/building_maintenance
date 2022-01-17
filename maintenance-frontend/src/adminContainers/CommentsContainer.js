
import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
import {createComment} from '../actions/commentsActions'
import {Link,useParams,useLocation} from 'react-router-dom';
// import {Link,useParams,useLocation} from 'react-router-dom';
// import EditEmployee from "./EditEmployee"
// import WorkOrder  from '../workorders/WorkOrder';
// import '../../styles/styles.css'


const CommentsContainer = (props)=>{
  const {id} = useParams()
  // let {user,admin} = props
  const [comment, setComment] = useState({
    work_order_id: id,
    subject: '',
    comment: '',
    // displayMoreComments: 3,
  })
  

  const handleOnChange = (e) => {
    if (e.target.name === 'comment'){
      e.target.style.height = "1px";
      e.target.style.height = (e.target.scrollHeight)+"px";
    }
    setComment({
      ...comment,
      [e.target.name]: e.target.value,

    })

  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    props.createComment(comment)
    setComment({
      // employee_id: '',
      // user_id: '',
      subject: '',
      comment: '',
    })
  }

  return (
  <div className='container'>
    <form className="title-form" onSubmit={handleOnSubmit} >
      <div className="d-flex mb-3">
        <input onChange={handleOnChange} placeholder="Subject" name="subject" type="text" value={comment.title}/><br/>
      </div>
      <div className="text-area-section">
        <textarea className='auto_height' onChange={handleOnChange} placeholder='Write a comment' name="comment" row='1' value={comment.comment}></textarea> 
        <input className='buttons' type="submit" value='Comment'/>
      </div>
    </form>
  </div>

  )
}

const mapStateToProps = state => { 
  return {
     comments: state.comments,
     loading: state.comments.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (action) => dispatch(createComment(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
