import React, { Component } from 'react'
import './App.css'

import Logo from '../logo2.png';

import { Link } from "react-router-dom";

class Navbar extends Component {


    render() {
        return (
            <div className='wrapper'>
                <div className='nav'>
                    <div className='logo'>
                        <Link to="/"><img src={Logo} alt='logo'/></Link>
                    </div>
                    <div className='acc-address'>{ this.props.account }</div>
                    <ul>
                        <li>
                            <Link className='nav-links' to="/">Explore</Link>
                        </li>
                        <li>
                            <Link className='nav-links' to="/myproperties">My Properties</Link>
                        </li>
                    </ul>
                    <li className='add'>
                        <Link className='nav-links' to="/addproperty">+ ADD PROPERTY</Link>
                    </li>
                </div>                
            </div>
        )
    }
}

export default Navbar