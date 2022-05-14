import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import { createBuilding} from '../../actions/buildingsActions'
import {clearErrors} from '../../actions/errorsActions'

const CreateBuilding = (props) =>{
    const {errors } = props
    const [building, setBuilding] = useState({
        address: "",
        super_name: "",
        phone_number: "",
    })
    const [acordion,setAcordion] = useState({
        acordion: 'display_accordion', 
        display: 'hide_elements',
    })

    useEffect(() => {
      if (errors.length > 0){
        props.clearErrors()
      }
    },[ ]);

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

    let handleOnSubmit = (e) =>{
        e.preventDefault()
        props.createBuilding(building)
        setBuilding({
          address: "",
          super_name: "",
          phone_number: "",
        })

        if (errors.length > 0){
          props.clearErrors()
        }
    }

  return(   
  
    <div className="center">
    <button onClick={handleOnclick} className={acordion.acordion}> Create A Building</button>
    <div className={acordion.display}>
    <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleOnSubmit}>
            <label>Address</label>
            <input onChange={handleOnChange}  name="address" className="form-control" type="text" value={building.address}/><br/>
            <label>Superintendent</label>
            <input onChange={handleOnChange} name="super_name" className="form-control" type="text" value={building.super_name}/><br/>
            <label>Phone</label>
            <input onChange={handleOnChange}  name="phone_number" className="form-control" type="phone" value={building.phone_number}/><br/>
            <button type='submit' className="btn btn-primary">Submit</button>
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
        buildings: state.buildings,
        loading: state.buildings.loading
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        createBuilding: (action) => dispatch(createBuilding(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(CreateBuilding)

