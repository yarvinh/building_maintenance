import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {editWorkOrder} from '../../actions/workOrdersActions'
import {clearErrors} from '../../actions/errorsActions'
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'

const EditWorkOrder = (props) =>{
    const {employees,buildings,errors} = props
    const {id} = useParams()
    const [workOrder, setWorkOrder] = useState({
        unit: "",
        date: "",
        building_id: "",
        employee_id: "",
        title: "",
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
     
      setWorkOrder({
       ...workOrder,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        props.editWorkOrder({[type]: workOrder[type],id: id})  
            setWorkOrder({
                ...workOrder,[type]: ""
        }) 
        if (errors.length > 0){
          props.clearErrors()
        }
          
    }

  return(   
      <div >
            <button onClick={handleOnclick} className={acordion.acordion}> Edit Work Order</button>
            <div className={acordion.display}>
            <div className="container d-flex justify-content-center align-items-center" > 
                <form onSubmit={(e)=>handleOnSubmit(e,"employee_id")} >
                    <label>Employee</label>
                    <select className="form-select mx-auto mb-3" onChange={handleOnChange} name="employee_id">
                      <option value=''>Select Employee</option>
                      {!employees.error_message? employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>):null}
                    </select>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>

            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={e => handleOnSubmit(e,'building_id')}>
                    <label>Building</label>
                    <select className="form-select mx-auto mb-3" onChange={handleOnChange} name="building_id">
                      <option value=''>Select Location</option>
                      {!buildings.error_message ? buildings.map(b => <option key={b.id} value={b.id}>{b.address}</option>):null}
                    </select>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form> 
            </div>

                <br/>
            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={ e=> handleOnSubmit(e,'date')}>
                  <label>Date</label>
                    <input onChange={handleOnChange}  name="date" className="form-control" type="date" value={workOrder.date}/><br/>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>

            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={ e=> handleOnSubmit(e,'title')}>
                   <label>Title</label>
                   <input onChange={handleOnChange} name="title" className="form-control" type="text" value={workOrder.title}/><br/>
                   <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>

            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={ e=> handleOnSubmit(e,'unit')}>
                  <label>Unit</label> <br/>
                  <textarea onChange={handleOnChange} row='1' className='auto_height' name="unit" value={workOrder.unit}></textarea> 
                  <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>
            <div>
              <p>{errors}</p>
            </div>
            </div>   
        </div>
      
  )
}

const mapStateToProps = state => { 
    return {
        employees: state.employees.employees,
        buildings: state.buildings.buildings,
        errors: state.errors.errors
    }
}


const mapDispatchToProps = dispatch => {
    return {
        editWorkOrder: (action) => dispatch(editWorkOrder(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditWorkOrder)