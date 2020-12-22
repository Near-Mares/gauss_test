import React from 'react'
import './sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebarLogo'>
                <img 
                    className='sidebarLogo__img'
                    src="https://media-exp1.licdn.com/dms/image/C4E0BAQE4nY9Bi5iO-Q/company-logo_200_200/0/1590682110911?e=2159024400&v=beta&t=4qmzDbUz6_g7PLEgSkZ9PIn0HPt0bHfmvgwe_Fa6lhQ"
                    alt='logogauss'
                />
            </div>

            <div className='sidebarTitle' style={{backgroundColor:' rgba(253, 253, 253, 0.2)'}}>
                <i className="fas fa-thumbs-up leftIcon"></i>
                <h5 className='selected'>Fitness for Duty</h5>
                <i className="fas fa-caret-right rightIcon"></i>
            </div>

            <div className='sidebarSubtitle'>
                <ul>
                    <li>Resumen</li>
                    <li className='selected'>Detalles</li>
                    <li>Personas</li>
                    <li>Resultados</li>
                </ul>
            </div>

            <div className='sidebarTitle'>
                <i className="fas fa-cog leftIcon"></i>
                <h5>Gestion de Datos</h5>
                <i className="fas fa-caret-right rightIcon"></i>
            </div>

        </div>
    )
}

export default Sidebar