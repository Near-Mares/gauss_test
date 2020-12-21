import React, { useEffect, useState } from 'react'
import './summary.css'


function Summary() {

    const [ summary, setSummary ] = useState(
        {
            response: {
            rejectedIndicator: {
            rate: 28,
            status: "Bad"
            },
            evolution: {
            meaning: "Good",
            trend: "Decrease",
            difference: 6
            },
            distribution: [
            {
            state: "Fair",
            quantity: 138
            },
            {
            state: "Rejected",
            quantity: 188
            },
            {
            state: "Pending",
            quantity: 209
            },
            {
            state: "Approved",
            quantity: 125
            }
            ]
            },
            timestamp: "2020-12-19T07:34:09.952",
            error: null
        }
    )

    //Peticion GET a API de gauss -- sin repsuesta
    useEffect(() => {
        const fetchSummary = async () => {
            fetch('http://vm.gausscontrol.com:8020/ffd/detail/summary?operation=Operación1&start=2020-12-15&end=2020-12-19')
            .then(res => res.json())
            .then( data => console.log(data))
            .catch(err => console.log(err))
        }
        fetchSummary();
    }, [])
   

    //tamaño proporcional de la caja de distribución de resultados deFFD
    let boxTotalSize = summary.response.distribution.reduce( (acc, amount) => acc+amount.quantity ,0)
    
    return (
        <div className='summaryContainer'>
            <div className='summaryContainer__left'>
                <div className='summary__tasa'>
                    <h4
                        style={ summary.response.rejectedIndicator.status === 'Bad' ? (
                            {
                                border: '20px solid #EA4C46',
                                backgroundColor: '#F1959B'
                            }
                        ) : (
                            {
                                border: '20px solid #05c394',
                                backgroundColor: '#00dba6'
                            }
                        )
                        }
                    >{summary.response.rejectedIndicator.rate}%
                    </h4>
                </div>
                <div className='summary__arrow'>
                    {
                        summary.response.evolution.trend==='Increase' ? (
                            <i className="fas fa-arrow-up" styles={{fontSize:'20px',color:'#A70000'}}></i>
                        ) : (
                            <i className="fas fa-arrow-down" style={{fontSize:'20px',color: '#05c394'}}></i>
                        )
                    }
                </div>
                <div className='summary__percentage'>
                    <i className="fas fa-question-circle" style={{color: 'gray'}}></i>
                    <p 
                        style={summary.response.evolution.trend==='Increase' ? {color:'#A70000'} : {color:'#05c394'}}
                    >
                        {summary.response.evolution.difference}%
                    </p>
                </div>
                <div className='summary__subtitle'>
                    <p>Tasa de rechazo de FFD del período</p>
                </div>

            </div>

            <div className='summaryContainer__right'>
                <div className='containerBox'>
                    <div 
                        className='aprovedBox'
                        style={{width: `${summary.response.distribution[0].quantity*100/boxTotalSize}%`}}
                    ></div>
                    <div
                        className='fairBox'
                        style={{width: `${summary.response.distribution[1].quantity*100/boxTotalSize}%`}}
                    ></div>
                    <div
                        className='rejectedBox'
                        style={{width: `${summary.response.distribution[2].quantity*100/boxTotalSize}%`}}
                    ></div>
                    <div
                        className='pendingBox'
                        style={{width: `${summary.response.distribution[3].quantity*100/boxTotalSize}%`}}
                    ></div>
                </div>
                <div className='summary__subtitle'>
                    <p>Distribución resultados de FFD del periodo</p>&nbsp;                    
                    <i className="fas fa-question-circle"></i>
                </div>
            </div>
        </div>
    )
}

export default Summary
