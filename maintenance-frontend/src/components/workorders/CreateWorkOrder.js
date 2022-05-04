
import React, {useState } from 'react';
import {useParams} from 'react-router-dom';
import {connect } from 'react-redux';
import {createWorkOrder} from '../../actions/workOrdersActions'
import '../../styles/styles.css'

const CreateWorkOrder = (props) => {
    const {id} = useParams()
    const {employees,buildings,errors} = props
    const [workOrder, setWorkOrder] = useState({
        unit: "",
        date: "",
        building_id: "",
        employee_id: id? id :"",
        title: "",
    })
    
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


    const handleOnSubmit=(e)=>{
      e.preventDefault()
      props.createWorkOrder(workOrder)
      setWorkOrder({
        unit: "",
        date: "",
        building_id: "",
        employee_id: id? id :"",
        title: "",
      })
    }

    const handleOnChange=(e)=>{
        // if (e.target.name === "task" ){
        //     e.target.style.height = "1px";
        //     e.target.style.height = (e.target.scrollHeight)+"px"; 
        // }
  
        setWorkOrder({
            ...workOrder,[e.target.name]: e.target.value
        })

    }
    return (
      <div>
        <button onClick={handleOnclick} className={acordion.acordion}> Create A Work Order</button>
        <div className={acordion.display}>
        <div className="container d-flex justify-content-center align-items-center">
    
        <form onSubmit={handleOnSubmit}>
           {!id? <select className="form-select mx-auto mb-3" onChange={handleOnChange} name="employee_id">
              <option value=''>Select Employee</option>
              
              {!employees.error_message? employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>):null}
            </select> :null}
            <select className="form-select mx-auto mb-3" onChange={handleOnChange} name="building_id">
              <option value=''>Select Location</option>
              {!buildings.error_message ? buildings.map(b => <option key={b.id} value={b.id}>{b.address}</option>):null}
            </select>
            <label>Date</label>
            <input onChange={handleOnChange}  name="date" className="form-control" type="date" value={workOrder.date}/><br/>
            <label>Title</label>
            <input onChange={handleOnChange} name="title" className="form-control" type="text" value={workOrder.title}/><br/>
            <label>Unit</label> <br/>
            <input onChange={handleOnChange}  name="unit" value={workOrder.unit}/><br/><br/>
            <button type='submit' className="btn btn-primary">Submit</button>
        </form>  
    </div>
    <div className="center"> 
        {errors? errors.map((e,k) => {return <p key={k}>{e}</p>}):null}
    </div>   
    </div>
      </div>
  )
}

// const mapStateToProps = state => { 
//   return {
//      errors: state.errors.errors,
//   }
// }

const mapDispatchToProps = dispatch => {
    return {
        createWorkOrder: (action) => dispatch(createWorkOrder(action)),
    }
}   
      
export default connect(null, mapDispatchToProps)(CreateWorkOrder)
