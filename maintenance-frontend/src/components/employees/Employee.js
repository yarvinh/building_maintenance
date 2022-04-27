
import {Link} from 'react-router-dom';
import '../../styles/styles.css'


const Employee = (props)=>{
    const {employee} = (props)
   
    return (
        <>
            <tr>
                <td>{props.index}</td>
                <td>
                    <Link to={`/employees/${employee.id}`}>   <p >{employee.name}</p>  </Link>
                </td>
                <td><p>{employee.email}</p></td>
                <td><p>{employee.phone}</p></td>
            </tr>
   
        </>        
    )
};


export default Employee 