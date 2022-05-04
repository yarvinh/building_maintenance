import { connect } from 'react-redux';
import CreateBuilding from '../components/buildings/CreateBuilding'
import Building from "../components/buildings/Building"
import {useParams} from 'react-router-dom';

const BuildingsContainer = (props) => {
    let {admin} = props.user
    const {buildings} = props.buildings
    const {id} = useParams()
  
    const renderBuildings = () => {     
        if (buildings.error_message){ 
                return buildings.error_message.map((err, i)=>{
                    return <li key={i}>{err}</li>
                })      
        }else{
           return (
            <>
            <table className="table table-striped" > 
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Address</th>
                <th scope="col">Superintendent</th>
                <th scope="col">Phone Number</th>
            </tr>
            </thead>
            <tbody>
              {buildings.map((building,index) => {return (<Building key={building.id} admin={admin} building={building} index={index + 1} />)}) }
            </tbody>
            </table>
            </>
           )

        }
    }

    return (
        <div>
          
            {!id && admin?<CreateBuilding user={props.user} />: null }
            <div>
              {!id? renderBuildings(): null }
            </div>
        </div>
    )

    
}


const mapStateToProps = state => { 
    return {
       buildings: state.buildings,
       loading: state.buildings.loading
    }
  }


  export default connect(mapStateToProps, null)(BuildingsContainer)
  