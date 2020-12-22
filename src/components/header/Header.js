import React, { useState, useEffect } from 'react';
import "./header.css";
import Autocomplete from '@material-ui/lab/Autocomplete';
//REACT-REDUX
import { useDispatch } from 'react-redux';
import { changeOperation } from '../../redux/actions/actions'


function Header() {

    const[operaciones, setOperaciones] = useState([])
    const[selectedOperacion, setSelectedOperacion] = useState('')

    const dispatch = useDispatch();

    /*
    const[fechas, setFechas] = useState({})
    const[startDate, setStartDate] = useState([])
    const[endDate, setEndDate] = useState([])
    */


    //Peticion GET a API de gauss
    useEffect(() => {
        const fetchOperations = async () => {
            fetch('http://vm.gausscontrol.com:8020/ffd/operations')
            .then(res => res.json())
            .then( data => {
                console.log('operations: ',data)
                setOperaciones(data.response.operations)
            })
            .catch(err => console.log(err))
        }
        fetchOperations();
    }, [])

    useEffect(() => {
        dispatch( changeOperation(selectedOperacion) )
        // eslint-disable-next-line
    }, [selectedOperacion])

    const changeOperacion = (e) => {
        console.log(e.target.innerHTML)
        setSelectedOperacion(e.target.innerHTML)
    }
    

    return (
        <div className='header'>
            <div className='headerLeft'>
                <label>
                    Operacion:
                </label>

                <Autocomplete
                    id="custom-input-demo"
                    options={operaciones}
                    autoComplete
                    onChange={e => changeOperacion(e)}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                        <input
                            style={{ 
                                width: 100,
                                height: 20,
                                backgroundColor: 'rgba(253,253,253, 0.2)', 
                                color: 'white',
                                borderStyle: 'none',
                                paddingLeft: '20px'
                            }}
                            type="text" {...params.inputProps} />
                        </div>
                    )}
                />

            </div>

            <div className='headerCenter'>
                <label>FECHA</label>
                
                <form name="datepicker" id="datepicker" method="get" autocomplete="off">
                    <input type="date" name="startDate" id="startDate" onChange={e => console.log(e)}/>
                    <input type="date" name="endDate" id="endDate" onChange={e => console.log(e)}/>
                </form>
            </div>

            <div className='headerRight'>
                <i class="fas fa-user"></i>
            </div>
        </div>
    )
}

export default Header
