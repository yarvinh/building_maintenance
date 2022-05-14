
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {useParams,Navigate} from 'react-router-dom';
import EditBuilding from "./EditBuilding"
import '../../styles/styles.css'
import {deleteBuilding} from "../../actions/buildingsActions"

const BuildingDetails = (props)=>{
    const {admin} = props.user
    const {id} = useParams()
    const {buildings} = props
    const building = buildings.find(building => building.id.toString() === id)

    const handleOnClick=(e)=>{
        const confirmBox = window.confirm(
            "Are you sure you want to delete this building?"     
          )
          if (confirmBox === true) {
              props.deleteBuilding(building.id)  
          }
           
    }

    if (building){
    return (
        <div className="center">
            <div>
              {id && props.user.admin?<EditBuilding/>:null}
            </div>
            <br/>
            <br/>
 
            <div className="container d-flex justify-content-center">

                <div className="card-container mb-3">



                  
                    {admin ? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>:null} 
                  
                    <div >
                    <Link to={`/buildings/${building.id}`}>  
                        <h3 className="card-header">{building.address}</h3>
                    </Link>
                    </div>
                    <div className="card-body">
                        <p>{building.super_name}</p>
                        <p>{building.phone_number}</p>
                    </div>   
                </div>

            </div>
        </div>
            
        )
    }else{
        return <Navigate to='/buildings'/>
    }
    
 

};


const mapStateToProps = state => { 
    return {
      buildings: state.buildings.buildings,
      loading: state.building.loading
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
    deleteBuilding: (action) => dispatch(deleteBuilding(action)),
   
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails)