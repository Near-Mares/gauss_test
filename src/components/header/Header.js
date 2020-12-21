import React, { useState, useEffect } from 'react';
import "./header.css";




function Header() {

    const[operaciones, setOperaciones] = useState([ 'operacion1', 'operacion 2', 'operacion 3'])

    //Peticion GET a API de gauss
    useEffect(() => {
        fetch('http://vm.gausscontrol.com:8020/ffd/operations', {
	        'mode': 'no-cors',
	        'headers': {
            	'Access-Control-Allow-Origin': '*',
        	}})
        .then( res => res)
        .then( data => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }, [])
    

    return (
        <div className='header'>
            <div className='headerLeft'>
                <label>
                    Operacion:
                </label>
                <select className="operacion" id="operacion">
                    { operaciones.map(operacion => <option value={operacion}>{operacion}</option>)}
                </select>
            </div>

            <div className='headerCenter'>
                <h4>FECHA</h4>
                <div> fechas-fechas </div>
            </div>

            <div className='headerRight'>
                <i class="fas fa-user"></i>
            </div>
        </div>
    )
}

export default Header
