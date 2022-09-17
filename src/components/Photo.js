import React from 'react'
import './App.css'
import welcome from '../web.jpg'

const Photo = () => {
    return (
        <div className='photo'>
            <img src={welcome} alt='Welcome' />
            <div className='matter'>
                <h1>Explore the world of Properties,<br/></h1>
                <h2>find your dream house.</h2>
            </div>
        </div>
    )
}

export default Photo