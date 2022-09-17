import React from 'react'
import { useHistory } from "react-router-dom";

import Singlebox from './Singlebox'

import {MdNavigateNext} from 'react-icons/md'
import './App.css'

const Houses = (props) => {

    const houses = props.houses.slice(props.houseCount-4, props.houseCount+1 ).reverse()

    let history = useHistory()

    function goToHousesPage() {
        history.push("/houses");
    }

    return (
        <div className='wrapper'>
            <div className='propcontainer'>
                <div className='sidehead'  onClick={goToHousesPage}>
                    <p>Houses</p>
                    <MdNavigateNext className='sidenext'/>
                </div>
                <div className='lists'>
                    { houses.map((house, key) => {
                        return(
                            <div key={key} className='single-box' >
                                <Singlebox 
                                    id={house.id}
                                    purchased={house.purchased}
                                    getImage={props.getImage}
                                    nameOfProp={house.title} 
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

export default Houses