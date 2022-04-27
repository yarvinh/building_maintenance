
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import {useParams,Navigate} from 'react-router-dom';
import EditBuilding from "./EditBuilding"
import '../../styles/styles.css'



const BuildingDetails = (props)=>{
    const {id} = useParams()
    const {buildings} = props
    const building = buildings.find(building => building.id.toString() === id)
    if (building){
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

  export default connect(mapStateToProps, null)(BuildingDetails)