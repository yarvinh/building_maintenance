
import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
import {createComment,fetchComments} from '../actions/commentsActions'
import {Link,useParams,useLocation} from 'react-router-dom';
import Comment  from '../components/comments/Comment';
import CreateComment from '../components/comments/CreateComment';



const CommentsContainer = (props)=>{
  const {id} = useParams()
  let {user,admin,error,comments} = props
  
  // let placehoderObj = {subject: "Subject", comment: "Write a comment"}
  // const [comment, setComment] = useState({
  //   work_order_id: id,
  //   subject: '',
  //   comment: '',
  // })

  useEffect(() => {
    props.fetchComments(id)

  },[ ]);
  
  // const [placehoder,setPlacehoder] = useState(placehoderObj)
  // const handleOnChange = (e) => {
  //   if (e.target.name === 'comment'){
  //     e.target.style.height = "1px";
  //     e.target.style.height = (e.target.scrollHeight)+"px";
  //   }
    
  //   setComment({
  //     ...comment,
  //     [e.target.name]: e.target.value,
  //   })
  // }

  // const handleOnSubmit = (e) => {
  //   e.preventDefault()
  //   props.createComment({comment})
  //   setComment({
  //     ...comment,
  //     subject: '',
  //     comment: '',
  //   })
  // }
  
  const renderComments = () => {
    
    return (
      <div>
        {/* {comment.id ? <Comment user={user} admin={admin} key={comment.id} comment={comment}/> :null} */}
        {comments && !comments.error? comments.map((comment)=>{return <Comment user={user} admin={admin} key={comment.id} comment={comment}/> }):null}
      </div>
    )
  }

  return (
  <div className='container'>
    <CreateComment  admin={admin} user={user}/>
    <div>
      {renderComments()}
    </div>
  </div>

  )
}

const mapStateToProps = state => {  

    return {
      comments: state.comments.comments,
      loading: state.comments.loading,
      // error: state.comments.comments.error
    }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (action) => dispatch(createComment(action)),
    fetchComments: (action) => dispatch(fetchComments(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
