import React,{ useState, useEffect } from 'react'
import './main.css'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Summary from '../summary/Summary';
import { useSelector } from 'react-redux';



function Main() {

    const [ ranking, setRanking ] = useState([])
    //React-Redux
    const operation = useSelector( state => state.operation)

    //Peticion GET a API de gauss 
    useEffect(() => {
        const fetchRanking = async () => {
            fetch('http://vm.gausscontrol.com:8020/ffd/detail/ranking')
            .then(res => res.json())
            .then( data => {
                console.log('ranking: ',data)
                setRanking(data.response)
            })
            .catch(err => console.log(err))
        }
        fetchRanking();
    }, [])

    //peticion GET a API de gauss con ranking y operacion
    useEffect(() => {
        const fetchRanking = async () => {
            fetch(`http://vm.gausscontrol.com:8020/ffd/detail/ranking?operation=${operation}`)
            .then(res => res.json())
            .then( data => {
                console.log('ranking con operacion seleccionada: ',data)
                setRanking(data.response)
            })
            .catch(err => console.log(err))
        }
        fetchRanking();
    }, [operation])


    return (
        <div className='mainContainer'>

            <div className='mainContainer__up'>

                <Summary />
                <p>* Rechazo: Se refiere a la(s) ocaciones en que uno o varios individuos fueron evaluados como NO APTOS para trabajar a través del cálculo de FITNESS FOR DUTY</p>
                <hr/>
            </div>

            <div className='mainContainer__down'>

                <div className= 'mainContainer__downTitle'>
                    <h4>Ranking de Personas</h4>
                </div>

                <div className='ranking'>
                    <div className='rankingRow__title'>

                        <div className='rankingRow__titleLeft'>
                            <p>N° Ranking </p>&nbsp;
                            <i class="fas fa-sort"></i>
                        </div>
                        <div className='rankingRow__titleCenter'>
                            <p>Nombre de Persona </p>&nbsp;
                            <i class="fas fa-sort"></i>
                        </div>

                        <div className='rankingRow__titleRight'>
                            <p>Tasa de rechazos FFD </p>&nbsp;
                            <i class="fas fa-sort"></i>&nbsp;
                            <i class="fas fa-question-circle"></i>
                        </div>

                    </div>

                   
                    <div className='rankingRow__container'> 
                        {
                            ranking.map( driver => (
                                <div className='rankingRow' key={driver.ranking}>

                                    <div className='rankingRow__numero'>
                                        <p>{driver.ranking}</p>
                                    </div>

                                    <div className='rankingRow__nombre'>
                                        <p><strong>{driver.name}</strong></p>
                                        <p>Transportista: {driver.carrier}</p>
                                        <p>Operacion: {driver.operation}</p>
                                        <p>Planta: {driver.plant}</p>
                                    </div>

                                    <div className='rankingRow__seen'>
                                        <i class="fas fa-eye"></i>
                                    </div>

                                    <div className='rankingRow__tasa'>
                                        <CircularProgressbar
                                            value={driver.rejectedIndicator.rate}
                                            text={`${driver.rejectedIndicator.rate}%`}
                                            styles={buildStyles({
                                                textSize: '23px',
                                                pathColor: `${
                                                    driver.rejectedIndicator.status === 'Good'? '#00dba6':
                                                    driver.rejectedIndicator.status === 'Fair'? '#F6B91A':
                                                    '#F05E6D'}`,
                                                textColor: `${
                                                    driver.rejectedIndicator.status === 'Good'? '#00dba6':
                                                    driver.rejectedIndicator.status === 'Fair'? '#F6B91A':
                                                    '#F05E6D'}`,
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#3e98c7',
                                            })}
                                        />
                                    </div>

                                </div>
                            ))
                        }
                    </div>

                    </div>

                </div>

            </div>
            
        
    )
}

export default Main
