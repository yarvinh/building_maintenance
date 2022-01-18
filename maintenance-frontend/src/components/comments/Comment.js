const Comment = (props)=>{
 
   let {comment} = props
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
  
      const comments = () =>{    
        return ( 
        //   this.props.game && this.display10Comments().map((comment)=>{
            // return  (    
              <div   className='post' key={comment.id}> 
                <div >
                  {/* {this.props.currentUser && comment.user.id === this.props.currentUser.id? <button onClick={this.handleDeleteOnClick} className='delete' value={comment.id}>X</button>:null} */}
                  <span >Posted by: {comment.employee.name} {dateAndTime()}</span>
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
           
            )    
        //   })
        // )
    }
  
    return (
      <div  className='comments_container'>
         {comments()}
      </div>
  
    )
  }

  export default Comment