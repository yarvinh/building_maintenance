
import {Link} from 'react-router-dom'
import '../../styles/styles.css'
import { connect } from 'react-redux';
import {deleteBuilding} from "../../actions/buildingsActions"

const Building = (props)=>{
    const {building,admin} = props
    const handleOnClick = (e)=> {
        const confirmBox = window.confirm(
            "Are you sure you want to delete this building?"     
          )
          if (confirmBox === true) {
            props.deleteBuilding(building.id)  
          }
           
     }
 
        return (
            <>
                <tr>
                    <td>{props.index}</td>
                    <td>
                       <Link to={`/buildings/${building.id}`}><p >{building.address}</p>  </Link>
                    </td>
                    <td><p>{building.super_name}</p></td>
                    <td><p>{building.phone_number}</p></td>
                    <td>{admin ? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>:null} </td>
                </tr>
       
            </>
        )
    
};



 
  const mapDispatchToProps = dispatch => {
    return {
    deleteBuilding: (action) => dispatch(deleteBuilding(action)),
   
    }
  }

  export default connect(null, mapDispatchToProps)(Building)