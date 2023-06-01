import React from 'react'
import { Link } from 'react-router-dom'

const Header = () =>{
    return (
        <div className='nav-container'>
            <div className='nav-title'>Testing-Features</div>
            <div className='nav-options'>
                <span><Link to="/">Home</Link></span>
                <span><Link to="/signed-file-upload">Signed File Upload</Link></span>
            </div>

        </div>
    )
}

export default Header