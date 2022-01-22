import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
import {createComment,fetchComments} from '../actions/commentsActions'
import {Link,useParams,useLocation} from 'react-router-dom';
import Reply  from '../components/replies/Reply';
import {fetchReplies} from '../actions/repliesActions'
import CreateReply from '../components/replies/CreateReply';



const RepliesContainer = (props)=>{
 
  
  let {replies} = props.comment
  let {user,admin,loading} = props
  console.log(replies)
  // useEffect(() => {
  //   console.log(id)
  //   props.fetchReplies(id)
  // },[]);
  
  return (
  <div className='container'>
    <CreateReply  admin={admin} user={user}/>
    <div>
      {replies ? replies.map((reply)=>{return <Reply user={user} admin={admin} key={reply.id} reply={reply}/> }):null}
    </div>
  </div>

  )
}

// const mapStateToProps = state => {  
//     return {
//       replies: state.replies.replies,
//       loading: state.replies.loading,
//     }
// }

const mapDispatchToProps = dispatch => {
  return {
    // createReply: (action) => dispatch(createReply(action)),
    fetchReplies: (action) => dispatch(fetchReplies(action))
  }
}
export default connect(null, mapDispatchToProps)(RepliesContainer)