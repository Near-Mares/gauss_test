import React, { useEffect, useState } from 'react'
import './summary.css'

import { useSelector } from 'react-redux';


function Summary() {

    const [ summary, setSummary ] = useState(
        {
            response: {
                rejectedIndicator: {
                    rate: 0,
                    status: "Good"
                },
                evolution: {
                    meaning: "Good",
                    trend: "Increase",
                    difference: 0
                },
                distribution: [
                    {
                        state: "Fair",
                        quantity: 50
                    },
                    {
                        state: "Rejected",
                        quantity: 50
                    },
                    {
                        state: "Pending",
                        quantity: 50
                    },
                    {
                        state: "Approved",
                        quantity: 50
                    }
                ]
            },
            timestamp: "2020-12-19T07:34:09.952",
            error: null
        }
    )

    //Peticion GET a API de gauss 
    useEffect(() => {
        const fetchSummary = async () => {
            fetch('http://vm.gausscontrol.com:8020/ffd/detail/summary')
            .then(res => res.json())
            .then( data => {
                console.log('summary:', data)
                setSummary(data)
            }
            )
            .catch(err => console.log(err))
        }
        fetchSummary();
    }, [])

    //Peticion GET a API de gauss con operation
    const operation = useSelector( state => state.operation)  
    useEffect(() => {
        const fetchSummary = async () => {
            fetch(`http://vm.gausscontrol.com:8020/ffd/detail/summary?operation=${operation}&`)
            .then(res => res.json())
            .then( data => {
                console.log('summary con operation:', data)
                setSummary(data)
            }
            )
            .catch(err => console.log(err))
        }
        fetchSummary();
    }, [operation])

    //tamaño proporcional de la caja de distribución de resultados de FFD
    let boxTotalSize = summary.response.distribution.reduce( (acc, amount) => acc+amount.quantity ,0)
    
    return (
        <div className='summaryContainer'>
            <div 
                className='mainContainer__left'
                style={{backgroundColor: `${
                    summary.response.rejectedIndicator.status === 'Good'? '#00dba6':
                    summary.response.rejectedIndicator.status === 'Fair'? '#F6B91A':
                    '#F05E6D'}`
                }}
            ></div>
            <div className='summaryContainer__left'>
                <div className='summary__tasa'>
                    <h4
                        style={ summary.response.rejectedIndicator.status === 'Bad' ? (
                            {
                                border: '10px solid #EA4C46',
                                backgroundColor: '#F1959B'
                            }
                        ) : (
                            {
                                border: '10px solid #05c394',
                                backgroundColor: '#00dba6'
                            }
                        )
                        }
                    >{summary.response.rejectedIndicator.rate}%
                    </h4>
                    <i className="fas fa-question-circle" style={{color: 'gray', marginTop: '20px'}}></i>

                </div>
                <div className='summary__arrow'>
                    {
                        summary.response.evolution.trend==='Increase' ? (
                            <i className="fas fa-arrow-up" style={{fontSize:'20px',color:'#F1959B'}}></i>
                        ) : (
                            <i className="fas fa-arrow-down" style={{fontSize:'20px',color: '#05C394'}}></i>
                        )
                    }
                </div>
                <div className='summary__percentage'>
                    <i className="fas fa-question-circle" style={{color: 'gray'}}></i>
                    <p 
                        style={summary.response.evolution.trend==='Increase' ? {color:'#F1959B'} : {color:'#05C394'}}
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
