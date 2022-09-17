import React from 'react'
import { useHistory } from "react-router-dom";

import Singlebox from './Singlebox'

import {MdNavigateNext} from 'react-icons/md'
import './App.css'

const Apartments = (props) => {

    const apartments = props.apartments.slice(props.apartmentCount-4, props.apartmentCount + 1).reverse()
    
    const history = useHistory()

    function goToApartmentsPage() {
        history.push("/apartments");
    }

    return (
        <div className='wrapper'>
            <div className='propcontainer'>
                <div className='sidehead'  onClick={goToApartmentsPage}>
                    <p>Apartments</p>
                    <MdNavigateNext className='sidenext'/>
                </div>
                <div className='lists'>
                    {    
                        apartments.map((apartment, key) => {
                        return(
                            <div key={key} className='single-box'>
                                <Singlebox 
                                    id={apartment.id}
                                    purchased={apartment.purchased}
                                    getImage={props.getImage}
                                    nameOfProp={apartment.title.toString()} 
                                    getPriceAndTime={props.getPriceAndTime}
                                    getLocations={props.getLocations}
                                    getRooms={props.getRooms}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Apartments