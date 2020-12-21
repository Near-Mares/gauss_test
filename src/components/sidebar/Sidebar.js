import React from 'react'
import './sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebarLogo'>
                <img className= 'sidebarLogo__img' src="gaussLogo.jpg" alt='logo'/>
            </div>

            <div className='sidebarTitle'>
                <i className="fas fa-thumbs-up"></i>
                <h5>Fitness for Duty</h5>
                <i className="fas fa-caret-right"></i>
            </div>
                

            <div className='sidebarTitle'>
                <i className="fas fa-cog"></i>
                <h5>Gestion de Datos</h5>
                <i className="fas fa-caret-right"></i>
            </div>

        </div>
    )
}

export default Sidebar