import React, {useState } from 'react';
import { connect } from 'react-redux';
import {createComment} from '../../actions/commentsActions'
import {useParams} from 'react-router-dom';
import Comment from './Comment';


const CreateComment = (props) => {

    const {id} = useParams()
    let {error} = props.comments
    // let {user,admin} = props
    // let commentToProps = props.comment
  
    let placeholderObj = {subject: "Subject", comment: "Write a comment"}
    const [comment, setComment] = useState({
      work_order_id: id,
      subject: '',
      comment: '',
    })

    const [placeholder,setPlacehoder] = useState(placeholderObj)

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

    const renderComment=()=>{
        if (error) {
            error.map((err) => {
                if( placeholder[err.split(" ")[0].toLowerCase()] === placeholderObj[err.split(" ")[0].toLowerCase()]){
                    setPlacehoder({
                       ...placeholder,
                       [ err.split(" ")[0].toLowerCase()]: err,
                    })
                }
            })
        // }else if(commentToProps.id){
        //     return <Comment user={user} admin={admin} key={commentToProps.id} comment={commentToProps}/>
        }
    }

    return (
        <div>
            <form className="title-form" onSubmit={handleOnSubmit} >
                <div className="d-flex mb-3">
                    <input onChange={handleOnChange} placeholder={placeholder.subject} name="subject" type="text" value={comment.subject}/><br/>
                </div>
                <div className="text-area-section">
                    <textarea className='auto_height' onChange={handleOnChange} placeholder={placeholder.comment} name="comment" row='1' value={comment.comment}></textarea> 
                    <input className='buttons' type="submit" value='Comment'/>
                </div>
            </form>
            {renderComment()}
        </div>
    )
}

  const mapStateToProps = state => { 
        return {
          comments: state.comments.comments,
          loading: state.comment.loading
       }

  }


  const mapDispatchToProps = dispatch => {
    return {
        createComment: (action) => dispatch(createComment(action))
    }
  }
  export default connect( mapStateToProps, mapDispatchToProps)(CreateComment)