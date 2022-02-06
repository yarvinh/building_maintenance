import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
// import {createComment,fetchComments} from '../actions/commentsActions'
// import {Link,useParams,useLocation} from 'react-router-dom';
import Reply  from '../components/replies/Reply';
// import {fetchReplies} from '../actions/repliesActions'
import CreateTask from '../components/tasks/CreateTask';



const TasksContainer = (props)=>{
  const [accordion, setAccordion] = useState({
    accordion: 'replies_accordion',
    displayAccordion: 'hide_replies',

  })


//   let {tasks} = props.workOrders
  let {user,admin,workOrder,loading} = props

  // useEffect(() => {
  //   props.fetchReplies(comment.id) 
  // },[ ]);

//   const handleOnclickReply = (e)=>{
//     if(accordion.accordion !== 'replies_accordion active'){
//     setAccordion({
//       accordion: 'replies_accordion active',
//       displayAccordion: 'display_replies'
//     })
//   }else{
//     setAccordion({
//       accordion: 'replies_accordion',
//       displayAccordion: 'hide_replies'
//     })
//   }
//   }
  
  return (
  <div>
    {/* <button onClick={handleOnclickReply} className={accordion.accordion}> {`${replies.length} Replies`} </button> */}
    {/* <div className={accordion.displayAccordion}> */}
      <div >
        <div className={'reply_wall'}>
          {/* {replies ? replies.map((reply)=>{return <Reply user={user} admin={admin} key={reply.id} reply={reply}/> }):null} */}
        </div>
        <div className="reply_input">
          <CreateTask workOrder={workOrder} admin={admin} user={user}/>
        </div>
        </div>
    {/* </div> */}
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
    // fetchReplies: (action) => dispatch(fetchReplies(action))
  }
}
export default connect(null, mapDispatchToProps)(TasksContainer)