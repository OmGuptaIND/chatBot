import React from 'react';
import './Header.css';

//Components;
import Logo from '../../images/logo.png';
import {useLocation} from 'react-router-dom'

export default function Header() {
    let location = useLocation();
    return (
        <div id = {location.pathname === '/' ? "":"next"} className='header' >
            <img src={Logo} alt='err' />
            <div className='options'>
                <p>Blog</p>
                <p className={location.pathname === '/' && 'dark'} >LogOut</p>
            </div>
        </div>
    )
}
