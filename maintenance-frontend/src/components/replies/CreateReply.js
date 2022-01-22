import React, {useState } from 'react';
import { connect } from 'react-redux';
import {createReply} from '../../actions/repliesActions'
import {useParams} from 'react-router-dom';



const CreateReply = (props) => {

    const {id} = useParams()
    let {error} = props.reply
  
    let placeholderObj = {reply: "Write a comment"}
    const [reply, setReply] = useState({
      comment_id: id,
      reply: '',
    })

    const [placeholder,setPlacehoder] = useState(placeholderObj)

    const handleOnChange = (e) => {
    if (e.target.name === 'reply'){
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
    }
    
    setReply({
        ...reply,
        [e.target.name]: e.target.value,
    })
    }



    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.createReply({reply})
        setReply({
          ...reply,
          reply: '',
        })
        setPlacehoder({
            reply: "Write a Reply"
        })
      }

    const renderReply=()=>{
        if (error) {
            error.map((err) => {
                if( placeholder[err.split(" ")[0].toLowerCase()] === placeholderObj[err.split(" ")[0].toLowerCase()]){
                    setPlacehoder({
                       ...placeholder,
                       [ err.split(" ")[0].toLowerCase()]: err,
                    })
                }
            })
        }
    }

    return (
        <div>
            <form className="title-form" onSubmit={handleOnSubmit} >
                <div className="d-flex mb-3">
                    <input onChange={handleOnChange} placeholder={placeholder.subject} name="reply" type="text" value={reply.reply}/><br/>
                </div>
            </form>
            {renderReply()}
        </div>
    )
}

  const mapStateToProps = state => { 
        return {
          comment: state.reply.reply,
          loading: state.reply.loading
       }
  }


  const mapDispatchToProps = dispatch => {
    return {
        createReply: (action) => dispatch(createReply(action))
    }
  }
  export default connect( mapStateToProps, mapDispatchToProps)(CreateReply)