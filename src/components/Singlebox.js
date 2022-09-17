import React, { useState } from "react";

import { useHistory } from "react-router";

import { GoLocation } from 'react-icons/go'
import { MdOutlineLiving, MdKitchen } from 'react-icons/md'
import { FaBed, FaBath, FaEthereum } from 'react-icons/fa'

const Singlebox = ( details ) => {

    const history = useHistory()

    const GoToProp = () => {
        history.push({
            pathname: `/proppage/${details.id}`,
            state: { propId: details.id }
        });
    }

    const [ image, setImage ] = useState()
    details.getImage(details.id, 0).then(function(val){setImage(val)})

    const [ fullPrice, setFullPrice ] = useState()
    details.getPriceAndTime(details.id, 1).then(function(val){setFullPrice(window.web3.utils.fromWei(val.toString(), 'Ether'))})

    const [ location0, setLocation0 ] = useState()
    const [ location1, setLocation1 ] = useState()

    details.getLocations(details.id, 0).then(function(val){setLocation0(val)})
    details.getLocations(details.id, 1).then(function(val){setLocation1(val)})

    const [ room0, setRoom0 ] = useState()
    const [ room1, setRoom1 ] = useState()
    const [ room2, setRoom2 ] = useState()
    const [ room3, setRoom3 ] = useState()

    details.getRooms(details.id, 0).then(function(val){setRoom0(val.toNumber())})
    details.getRooms(details.id, 1).then(function(val){setRoom1(val.toNumber())})
    details.getRooms(details.id, 2).then(function(val){setRoom2(val.toNumber())})
    details.getRooms(details.id, 3).then(function(val){setRoom3(val.toNumber())})

    return (
        <div className="detail-container" onClick={GoToProp} >
            <img src={`https://ipfs.io/ipfs/${image}`} alt="Loading" height='150'/>
            <div className="price">
                {details.purchased
                    ?<b>PURCHASED</b>
                    :<b>{ fullPrice }&nbsp;ETH&nbsp;< FaEthereum /></b>
                }
            </div>
            <div className="details">
                <div className="p1">{ details.nameOfProp }</div>
                <p><GoLocation /> {location0}-{location1}</p>
                <div className="count-of-rooms">
                    <div><p><MdOutlineLiving size={20}/>  <b>{room0}</b></p></div>
                    <div><p><FaBed size={20}/>  <b>{room1}</b></p></div>
                    <div><p><FaBath size={20}/>  <b>{room2}</b></p></div>
                    <div><p><MdKitchen size={20}/>  <b>{room3}</b></p></div>
                </div>
            </div>
        </div>
    )
}

export default Singlebox