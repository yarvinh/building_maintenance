import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteComment} from '../../actions/commentsActions'
import RepliesContainer from '../../containers/RepliesContainer';
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

      // handleOnclick = (e)=>{
      //   if(this.state.acordion !== 'replies_accordion active'){
      //   this.setState({
      //     acordion: 'replies_accordion active',
      //     displayAcordion: 'display_replies'
      //   })
      // }else{
      //   this.setState({
      //     acordion: 'replies_accordion',
      //     displayAcordion: 'hide_replies'
      //   })
      // }
      // }

      // const RepliesDisplayButton = ()=>{
      //   return (
      //   <form onSubmit={handleOnSubmit} >  
      //     <input  className='reload' type='submit' value='Reload more comments'/> 
      //   </form>
      //   )
   
      // }
    
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
                  {comment.user?<span >Posted by: {comment.user.company_name} {dateAndTime()}</span>:<span >Posted by: <Link to={`/employees/${comment.employee.id}`}>{comment.employee.name}</Link> {dateAndTime()}</span>}
                </div>
                <div className='subject'>
                    <h3 className="comment_subject">{comment.subject}</h3>
                </div>
                <div className='comments'>
                    <p>{comment.comment}</p> 
                </div> 
  
                <div>
                  <div>
                    <p>Future Likes</p>
                    {/* {this.props.loggedIn ?<Likes likes={comment.likes} comment_id={comment.id} user_id={this.props.currentUser.id} gameCommentOrReply={comment}/>: null} */}
                  </div>
  
                  <div >
                    {user && Object.keys(comment).length > 0? <RepliesContainer comment={comment} admin={admin} user={user}/>: null}
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