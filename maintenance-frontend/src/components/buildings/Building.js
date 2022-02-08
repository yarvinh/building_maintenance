import React, {useEffect } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import EditBuilding from "./EditBuilding"
import '../../styles/styles.css'
import { fetchBuilding } from '../../actions/buildingsActions';


const Building = (props)=>{
    const {id} = useParams()
    let err = props.buildingById.building.error
    useEffect(() => {
        if(id){
            props.fetchBuilding(id) 
        }
    },[]);
 
    let building = null
    id? building = props.buildingById.building: building = props.building
    if(id){
    return (
        <div className="center">
            <div>
              {id && props.user.admin?<EditBuilding/>:null}
            </div>
            <div className="container d-flex justify-content-center">
                <div className="card-container mb-3">
                    <div >
                    <Link to={`/buildings/${building.id}`}>  
                        <h3 className="card-header">{building.address}</h3>
                    </Link>
                    </div>
                    <div className="card-body">
                        {err? err.map(e => e):null}
                        <p>{building.super_name}</p>
                        <p>{building.phone_number}</p>
                    </div>   
                </div>
            </div>
        </div>
            
        )
    } else{
        return (
            <>
                <tr>
                    <td>{props.index}</td>
                    <td>
                       <Link to={`/buildings/${building.id}`}><p >{building.address}</p>  </Link>
                    </td>
                    {/* {err? err.map(e => e):null} */}
                    <td><p>{building.super_name}</p></td>
                    <td><p>{building.phone_number}</p></td>
                </tr>
       
            </>
        )
    }
 

};


const mapStateToProps = state => { 
    return {
       buildingById: state.building,
       loading: state.building.loading
    }
  }

const mapDispatchToProps = dispatch => {
    return {
       fetchBuilding: (action) => dispatch(fetchBuilding(action))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Building)