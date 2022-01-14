import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchBuildings} from '../actions/buildingsActions'
import CreateBuilding from '../components/buildings/CreateBuilding'
import Building from "../components/buildings/Building"
import {useParams} from 'react-router-dom';

const BuildingsContainer = (props) => {
    let {admin} = props.user
    const {buildings} = props.buildings
    const {id} = useParams()
    useEffect(() => {
        props.fetchBuildings() 
    },[ ]);
     
    const renderBuildings = () => {  
        
        if (buildings.error_message){ 
                return buildings.error_message.map((err, i)=>{
                    return <li key={i}>{err}</li>
                })      
        }else{
            return  buildings.map((building)=>{
               return <Building key={building.id} building={building}/>  
           })   
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

const mapDispatchToProps = dispatch => {
    return {
       fetchBuildings: (action) => dispatch(fetchBuildings(action))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(BuildingsContainer)
  