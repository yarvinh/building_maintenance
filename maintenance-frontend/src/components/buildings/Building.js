
import {Link} from 'react-router-dom'
import '../../styles/styles.css'

const Building = (props)=>{
    const {building} = props
 
        return (
            <>
                <tr>
                    <td>{props.index}</td>
                    <td>
                       <Link to={`/buildings/${building.id}`}><p >{building.address}</p>  </Link>
                    </td>
                    <td><p>{building.super_name}</p></td>
                    <td><p>{building.phone_number}</p></td>
                </tr>
       
            </>
        )
    
};



  export default Building