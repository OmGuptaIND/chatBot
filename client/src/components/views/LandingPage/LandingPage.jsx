import React from 'react';
import './LandingPage.css';

//Components;
import Hero from '../../../images/hero.png';
import {Fade} from 'react-reveal';
import {useHistory} from 'react-router-dom'
import Header from '../../../partials/Header/Header';
export default function LandingPage() {
    let history = useHistory();
    return (
        <>
        <Fade top ><Header /></Fade>
        <div className='hr' >
            <img src={Hero} alt = 'err' />
            <div className='hr-options'>
                <Fade><p onClick = {()=>history.push('/login')}  >Login</p></Fade>
                <Fade><p onClick = {()=>history.push('/register')} >Register</p></Fade>
            </div>
        </div>
        </>
    )
}
