import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {editBuilding} from '../../actions/buildingsActions'
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import '../../styles/styles.css'

const EditBuilding = (props) =>{
    const {errors} = props
    let {id} = useParams()
    const [building, setBuilding] = useState({
        address: "",
        super_name: "",
        phone_number: "",
 
    })

    useEffect(() => {
        if (errors.length > 0){
          props.clearErrors()
        }
    },[ ]);

    

    const [acordion,setAcordion] = useState({
        acordion: 'display_accordion', 
        display: 'hide_elements',
    })

    const handleOnclick = (e)=>{
        if(acordion.acordion !== 'display_accordion active'){
        setAcordion({
          acordion: 'display_accordion active',
          display: 'display_elements',
        })
      }else{
        setAcordion({
          acordion: 'display_accordion',
          display: 'hide_elements', 
        })
      }
    }
    
    let handleOnChange = (e)=>{
      setBuilding({
       ...building,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        props.editBuilding({[type]: building[type],id: id})  
            setBuilding({
                ...building,[type]: ""
        })    
    }

  return(   
      <div className="center">
            <button onClick={handleOnclick} className={acordion.acordion}> Edit Employee</button>
            <div className={acordion.display}>
            <div className="container d-flex justify-content-center align-items-center" > 
                <form onSubmit={(e)=>handleOnSubmit(e,"address")} >
                    <label>Address</label>
                    <input onChange={handleOnChange} value={building.address} className="form-control" type="text" name="address"/>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>
            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={e => handleOnSubmit(e,'phone_number')}>
                    <label>Phone Number</label>
                    <input onChange={handleOnChange} value={building.phone_number} className="form-control" type="phone" name="phone_number" />
                    <button type='submit' className="btn btn-primary">Save</button>
                </form> 
            </div>
                <br/>
            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={ e=> handleOnSubmit(e,'super_name')}>
                    <label>Super Name</label>
                    <input onChange={handleOnChange}  value={building.super_name} className="form-control" type="text"  name="super_name"/>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>
             <br/>
            <div> 
                {errors.map((e,k) => {return <p key={k}>{e}</p>})}
            </div> 
            </div>
           
  
        </div>
      
  )
}


const mapStateToProps = state => { 
    return {
        errors: state.errors.errors,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        editBuilding: (action) => dispatch(editBuilding(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditBuilding)