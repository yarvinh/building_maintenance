
import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
import {createComment,fetchComments} from '../actions/commentsActions'
import {Link,useParams,useLocation} from 'react-router-dom';
import Comment  from '../components/comments/Comment';
import CreateComment from '../components/comments/CreateComment';



const CommentsContainer = (props)=>{
  const {id} = useParams()
  let {user,admin,comments} = props

  useEffect(() => {
    props.fetchComments(id)
  },[]);
  
  return (
  <div className='container'>
    <CreateComment  admin={admin} user={user}/>
    <div>
    {comments? comments.map((comment)=>{return <Comment user={user} admin={admin} key={comment.id} comment={comment}/> }):null}
    </div>
  </div>

  )
}

const mapStateToProps = state => {  
    return {
      comments: state.comments.comments,
      loading: state.comments.loading,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (action) => dispatch(createComment(action)),
    fetchComments: (action) => dispatch(fetchComments(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
