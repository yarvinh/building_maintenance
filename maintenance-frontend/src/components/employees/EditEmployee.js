import React, {useState } from 'react';
import { connect } from 'react-redux';
import {editEmployee} from '../../actions/employeesActions'
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'

const EditEmployee = (props) =>{
    let {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        old_password: '',
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
    
    let handleOnChange = (e)=>{
      setEmployee({
       ...employee,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        if(type === 'password'){
            props.editEmployee({employee:{[type]: employee[type],old_password: employee.old_password}, id: id}) 
        }else{ 
            props.editEmployee({[type]: employee[type],id: id})  
            setEmployee({
                ...employee,[type]: ""
            }) 
        }
    
    }

  return(   
      <div >
            <button onClick={handleOnclick} className={acordion.acordion}> Edit Employee</button>
            <div className={acordion.display}>
            <div className="container d-flex justify-content-center align-items-center" > 
                <form onSubmit={(e)=>handleOnSubmit(e,"name")} >
                    <label>Name</label>
                    <input onChange={handleOnChange} value={employee.name} className="form-control" type="text" name="name"/>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>
            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={e => handleOnSubmit(e,'phone')}>
                    <label>Phone Number</label>
                    <input onChange={handleOnChange} value={employee.phone} className="form-control" type="phone" name="phone" />
                    <button type='submit' className="btn btn-primary">Save</button>
                </form> 
            </div>
                <br/>
            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={ e=> handleOnSubmit(e,'email')}>
                    <label>Email</label>
                    <input onChange={handleOnChange}  value={employee.email}className="form-control" type="email"  name="email"/>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>
            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={e => handleOnSubmit(e,'username')}>
                    <label>Username:</label>
                    <input onChange={handleOnChange}  value={employee.username} className="form-control" type="text"  name="username"/>
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>
            </div>
            <div className="container d-flex justify-content-center align-items-center"> 
                <form onSubmit={e => handleOnSubmit(e,'password')}>  
                    <label>Password:</label>
                    <input onChange={handleOnChange} value={employee.password}className="form-control" type="password" name="password" />
                    <label>Confirm Old Password:</label>
                    <input onChange={handleOnChange}  value={employee.old_password} className="form-control" type="password" name="old_password" />
                    <button type='submit' className="btn btn-primary">Save</button>
                </form>  
            </div>  
            </div>
          
        </div>
      
  )
}

// const mapStateToProps = state => { 
//     return {
//         employees: state.employees,
//         loading: state.employees.loading
//     }
// }
      
const mapDispatchToProps = dispatch => {
    return {
        editEmployee: (action) => dispatch(editEmployee(action)),
    }
}   
      
export default connect(null, mapDispatchToProps)(EditEmployee)



