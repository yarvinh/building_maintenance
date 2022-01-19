
import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
import {createComment,fetchComments} from '../actions/commentsActions'
import {Link,useParams,useLocation} from 'react-router-dom';
// import {Link,useParams,useLocation} from 'react-router-dom';
// import EditEmployee from "./EditEmployee"
import Comment  from '../components/comments/Comment';
// import '../../styles/styles.css'


const CommentsContainer = (props)=>{
  const {id} = useParams()

  let {user,admin,error,comments} = props
  let placehoderObj = {subject: "Subject", comment: "Write a comment"}
  const [comment, setComment] = useState({
    work_order_id: id,
    subject: '',
    comment: '',
  })
  
  const [placehoder,setPlacehoder] = useState(placehoderObj)
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
    props.createComment({comment})
    setComment({
      ...comment,
      subject: '',
      comment: '',
    })
  }

  const renderComments = () => {
     if (error) {
        error.map((err) => {
         if( placehoder[err.split(" ")[0].toLowerCase()] === placehoderObj[err.split(" ")[0].toLowerCase()]){
            setPlacehoder({
              ...placehoder,
              [ err.split(" ")[0].toLowerCase()]: err,
            })
         }
        })
     } else if (comments){
       return comments.map((comment)=>{
         return (
            <Comment user={user} admin={admin} key={comment.id} comment={comment}/> 
         )
       }) 
     }
  }

  return (
  <div className='container'>
    <form className="title-form" onSubmit={handleOnSubmit} >
      <div className="d-flex mb-3">
        <input onChange={handleOnChange} placeholder={placehoder.subject} name="subject" type="text" value={comment.subject}/><br/>
      </div>
      <div className="text-area-section">
        <textarea className='auto_height' onChange={handleOnChange} placeholder={placehoder.comment} name="comment" row='1' value={comment.comment}></textarea> 
        <input className='buttons' type="submit" value='Comment'/>
      </div>
    </form>
    <div>
      {renderComments()}
    </div>
  </div>

  )
}

const mapStateToProps = state => {  
  if(state.comments.comments.length !== 0){
    return {
      comments: state.comments.comments,
      loading: state.comments.loading,
      error: state.comments.comments.error
    }
  } else {
    return {
      loading: state.comments.loading
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (action) => dispatch(createComment(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
