import { connect } from 'react-redux';
import {Link,useParams,useLocation} from 'react-router-dom';
import {deleteComment} from '../../actions/commentsActions'
const Comment = (props)=>{

   let {comment,admin,user} = props
    const dateAndTime = ()=>{
        const date = new Date(comment.created_at)
        const time = new Date(comment.created_at)
        return (
          <div>
              <span>{date.toDateString()} at </span>      
              <span>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
        )
      }
    
      const handleOnClick = (e) =>{
          props.deleteComment(comment.id)
      }

      const deleteComment = ()=>{
        if(admin && user.id.toString() === comment.user_id || user.id.toString() === comment.employee_id){
           return <button onClick={handleOnClick} className='delete' value={comment.id}>X</button>
        }
      } 

        return (   
          <div  className='comments_container'> 
              <div   className='post' key={comment.id}> 
                <div >
                  {deleteComment()}
                  {comment.user?<span >Posted by: {comment.user.company_name} {dateAndTime()}</span>:<span >Posted by: {comment.employee.name} {dateAndTime()}</span>}
                </div>
                <div className='subject'>
                    <h3 className="comment_subject">{comment.subject}</h3>
                </div>
                <div className='comments'>
                    <p>{comment.comment}</p> 
                </div> 
  
                <div>
                  <div>
                    {/* {this.props.loggedIn ?<Likes likes={comment.likes} comment_id={comment.id} user_id={this.props.currentUser.id} gameCommentOrReply={comment}/>: null} */}
                  </div>
  
                  <div>
                    {/* <Reply replies={comment.replies_by_date} loggedIn={this.props.loggedIn} comment_id={comment.id} currentUser={this.props.currentUser} comment={comment}/> */}
                  </div>  
  
                </div>
              </div>
           </div>
            )    
  }

  // const mapStateToProps = state => { 
  
  //   if(state.comment.comment.id){
  //       return {
  //      comment: state.comment.comment,
  //      loading: state.comment.loading
  //      }
  //   }else{
  //     return {
  //       loading: state.comment.loading
  //     }
  //   }
  // }

  const mapDispatchToProps = dispatch => {
    return {
      deleteComment: (action) => dispatch(deleteComment(action))
    }
  }
  export default connect(null, mapDispatchToProps)(Comment)