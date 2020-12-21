import React,{ useState, useEffect } from 'react'
import './main.css'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Summary from '../summary/Summary';

function Main() {

    const [ ranking, setRanking ] = useState([])

    useEffect(() => {
        setRanking([
            {
            "name": "Eduardo Elihu Munguía González",
            "carrier": "Transportista 2",
            "operation": "Operación 1",
            "plant": "Planta 2",
            "rejectedIndicator": {
                "rate": 100,
                "status": "Bad"
                },
            "ranking": 38
            },
            {
            "name": "Daniel Torres Rojas",
            "carrier": "Transportista 2",
            "operation": "Operación 1",
            "plant": "Planta 2",
            "rejectedIndicator": {
                "rate": 100,
                "status": "Bad"
                },
            "ranking": 37
            },
            {
                "name": "Hansel Andres Espejo Ramos",
                "carrier": "Transportista 3",
                "operation": "Operación 1",
                "plant": "Planta 2",
                "rejectedIndicator": {
                "rate": 100,
                "status": "Bad"
                },
                "ranking": 35
            },
        ])

    }, [])


    return (
        <div className='mainContainer'>
            <div className='mainContainer__up'>

                <Summary />
                <p>* Rechazo: Se refiere a la(s) ocaciones en que uno o varios individuos fueron evaluados como NO APTOS para trabajar a través del cálculo de FITNESS FOR DUTY</p>
                <hr></hr>
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
                                            textSize: '17px',
                                            pathColor: `rgba(62, 152, 199, ${driver.rejectedIndicator.rate / 100})`,
                                            textColor: 'gray',
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
    )
}

export default Main
