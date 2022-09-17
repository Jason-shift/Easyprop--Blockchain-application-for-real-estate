import React, { useState } from "react";
import PhotoSlides from "./PhotoSlides";

import { GiDoorHandle } from 'react-icons/gi'
import { MdOutlineLiving, MdKitchen, MdOutlineGarage } from 'react-icons/md'
import { FaBed, FaBath } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'

import { useParams } from "react-router";
import { useHistory } from "react-router";

const PropPage = (props) => {

    const history = useHistory()

    const SellProp = () => {
        history.push({
            pathname: `/sellprop/${property.id}`,
            state: { propId: property.id }
        })
    }

    const { propId } = useParams()
    const property = props.properties[propId-1]

    const [ image0, setImage0 ] = useState()
    const [ image1, setImage1 ] = useState()
    const [ image2, setImage2 ] = useState()
    const [ image3, setImage3 ] = useState()

    props.getImage(propId, 0).then(function(val){setImage0(val)})
    props.getImage(propId, 1).then(function(val){setImage1(val)})
    props.getImage(propId, 2).then(function(val){setImage2(val)})
    props.getImage(propId, 3).then(function(val){setImage3(val)})

    const [ location0, setLocation0 ] = useState()
    const [ location1, setLocation1 ] = useState()
    const [ location2, setLocation2 ] = useState()
    const [ location3, setLocation3 ] = useState()
    const [ location4, setLocation4 ] = useState()
    
    props.getLocations(propId, 0).then(function(val){setLocation0(val)})
    props.getLocations(propId, 1).then(function(val){setLocation1(val)})
    props.getLocations(propId, 2).then(function(val){setLocation2(val)})
    props.getLocations(propId, 3).then(function(val){setLocation3(val)})
    props.getLocations(propId, 4).then(function(val){setLocation4(val)})
    
    const [ room0, setRoom0 ] = useState()
    const [ room1, setRoom1 ] = useState()
    const [ room2, setRoom2 ] = useState()
    const [ room3, setRoom3 ] = useState()
    const [ room4, setRoom4 ] = useState()
    const [ room5, setRoom5 ] = useState()
    
    props.getRooms(propId, 0).then(function(val){setRoom0(val.toNumber())})
    props.getRooms(propId, 1).then(function(val){setRoom1(val.toNumber())})
    props.getRooms(propId, 2).then(function(val){setRoom2(val.toNumber())})
    props.getRooms(propId, 3).then(function(val){setRoom3(val.toNumber())})
    props.getRooms(propId, 4).then(function(val){setRoom4(val.toNumber())})
    props.getRooms(propId, 5).then(function(val){setRoom5(val.toNumber())})

    const [holding, setHolding ] = useState()
    const [ fullPrice, setFullPrice ] = useState()
    const [ due, setDue ] = useState()
    const [ houseDoc, setHouseDoc ] = useState()
    const [ dateHeld, setDateHeld ] = useState()

    props.getPriceAndTime(propId, 0).then(function(val){setHolding(window.web3.utils.fromWei(val.toString(), 'Ether'))})
    props.getPriceAndTime(propId, 1).then(function(val){setFullPrice(window.web3.utils.fromWei(val.toString(), 'Ether'))})
    props.getPriceAndTime(propId, 2).then(function(val){setDue(val)})
    props.getPriceAndTime(propId, 3).then(function(val){setHouseDoc(val)})
    props.getPriceAndTime(propId, 4).then(function(val){setDateHeld(val)})

    const [ sellerName, setName ] = useState()
    const [ SellerPhone, setPhone ] = useState()

    props.getSellerDetails(propId, 0).then(function(val){setName(val)})
    props.getSellerDetails(propId, 1).then(function(val){setPhone(val)})

    if(property.status === "On Hold"){
        const today = new Date()
        // console.log(typeof(dateHeld))
        const dateHeld1 = new Date(dateHeld)
        // console.log(today, dateHeld1)
        const difference = parseInt(Math.abs(dateHeld1-today)/60/60/24/1000)
        // console.log(difference)
        if(difference > due){
            props.changeStatus(property.id.toNumber(), "Not Requested")
        }
    }
    const [ owners, setOwners ] = useState([])
    props.getAllOwners(propId).then(function(val){setOwners(val)})

    return(
        <div>
            <div className="prop-wrapper">
                <h1>{property.title}</h1>
                <PhotoSlides image0={image0} image1={image1} image2={image2} image3={image3}/>
                <div className="prop-details">
                    <div className="line" />
                    <h4>Property description</h4>
                    <div className="description">
                        <p>
                            {property.description}
                        </p>
                    </div>
                    <div className="location">
                    </div>
                    <div className="line" />
                    <div className="room-owner">
                        <div>
                            <h4>Room details</h4>
                            <div className="rooms">
                                <div className="room-profile">
                                    <div className="living">
                                        <h4><MdOutlineLiving size={30} /></h4>
                                        
                                        <h4>{room0}</h4>
                                    </div>
                                    <div className="living">
                                        <h4><MdKitchen size={30}/></h4>  
                                        
                                        <h4>{room3}</h4>
                                    </div>
                                </div>
                                <div className="room-profile">
                                    <div className="living">
                                        <h4><FaBed size={30}/></h4>  
                                        
                                        <h4>{room1}</h4>
                                    </div>
                                    <div className="living">
                                        <h4><MdOutlineGarage size={30}/></h4>  
                                        
                                        <h4>{room5}</h4>
                                    </div>
                                </div>
                                <div className="room-profile">
                                    <div className="living">
                                        <h4><FaBath size={30}/></h4>  
                                        
                                        <h4>{room2}</h4>
                                    </div>
                                    <div className="living">
                                        <h4><GiDoorHandle size={30}/></h4>  
                                        
                                        <h4>{room4}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Location details</h4>
                            <div className="rooms">
                                <div className="room-profile">
                                    <div className="loc">
                                        <h4>Country</h4>
                                        <p>&nbsp;&nbsp;&nbsp;</p>
                                        <h4>{location0}</h4>
                                    </div>
                                    <div className="loc">
                                        <h4>City   </h4>
                                        <p>&nbsp;&nbsp;&nbsp;</p>
                                        <h4>{location1}</h4>
                                    </div>
                                </div>
                                <div className="room-profile">
                                    <div className="loc">
                                        <h4>Street  </h4>
                                        <p>&nbsp;&nbsp;&nbsp;</p>
                                        <h4>{location3}</h4>
                                    </div>
                                    <div className="loc">
                                        <h4>Door No.</h4>
                                        <p>&nbsp;&nbsp;&nbsp;</p>
                                        <h4>{location2}</h4>
                                    </div>
                                </div>
                                <div className="room-profile">
                                    <div className="loc">
                                        <h4>Pin Code</h4>  
                                        <p>&nbsp;&nbsp;&nbsp;</p>
                                        <h4>{location4}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                    <div>
                        <div>
                            <h4>Buying details</h4>
                            <div className="rooms">
                                <div className="room-profile">
                                    <div className="living">
                                        <h4>Holding Deposit</h4>
                                        
                                        <h4>{holding}(ETH)  |  {holding*155772}(INR)</h4>
                                    </div>
                                    <div className="living">
                                        <h4>Full Price</h4>  
                                        
                                        <h4>{fullPrice}(ETH)  |  {fullPrice*155772}(INR)</h4>
                                    </div>
                                </div>
                                <div className="room-profile">
                                    <div className="living">
                                        <h4>Time Duration</h4>  
                                        
                                        <h4>{due}</h4>
                                    </div>
                                    <div>
                                        <div className="living">
                                            <h4>Prop Doc</h4>  
                                            <button className="opendoc" onClick={() => {window.open(`https://ipfs.io/ipfs/${houseDoc}`, "_blank")}}>OPEN DOCUMENT</button>
                                        </div>
                                        <h4>
                                            If the document is not opening paste this link in the browser<br/>
                                            https://ipfs.io/ipfs/{houseDoc}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                    <div>
                        <h4>Previous owners</h4><br/>
                        {
                            Object.keys(owners).length > 0
                            ?<div>
                                {
                                    Object.keys(owners).map((key) => {
                                        return (
                                            <div key={key}>
                                                <h5>{owners[key]}</h5>
                                                <h5><TiArrowSortedDown /></h5>
                                            </div>
                                        )
                                    })
                                }
                                <h4>Current Owner</h4>
                            </div>
                            :<h5>No Previous Owners</h5>
                        }
                    </div>
                    <div className="line" />
                    <div>
                        <div>
                            <h4>Seller details</h4>
                            <div className="sells">
                                <div className="sell-profile">
                                    <div className="living">
                                        <h4>Seller Name</h4>
                                        <h4>{sellerName}</h4>
                                    </div>
                                    <div className="living">
                                        <h4>Seller Phone</h4>  
                                        <h4>{SellerPhone}</h4>                                        
                                    </div>
                                </div>
                                <div className="sell-profile">
                                    <div className="living">
                                        <h4>Seller Account Address</h4>  
                                        <h4>{property.sellerAddress}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="line" />
                    {
                        property.purchased
                        ?property.sellerAddress.toString() === props.account.toString()
                            ?<div>
                                <h5>YOU HAVE ALREADY PURCHASED THIS PROPERTY</h5>
                                <button className="addprop" onClick={SellProp}>
                                    SELL THIS PROPERTY
                                </button>
                            </div>
                            :<h5>THIS PROPERTY HAS ALREADY BEEN PURCHASED</h5>
                        :property.status === "Not Requested"
                            ?property.sellerAddress.toString() === props.account.toString()
                                ?<h5>NO REQUESTS YET</h5>
                                :<button className="buyprop" onClick={() => {props.changeStatus(property.id.toNumber(), "Requested")}}>REQUEST TO BUY THIS PROPERTY</button>
                            :property.status === "Requested"
                                ?property.sellerAddress.toString() === props.account.toString()
                                    ?<div>
                                        <h5>REQUESTED BY :: {property.signedBy}</h5>
                                        <div className="accept-reject">
                                            <button className="buyprop-acc" onClick={() => {props.changeStatus(property.id.toNumber(), "Accepted")}}>ACCEPT THE REQUEST</button>
                                            <button className="buyprop-acc" onClick={() => {props.changeStatus(property.id.toNumber(), "Not Requested")}}>REJECT THE REQUEST</button>
                                        </div>
                                    </div>
                                    :property.signedBy.toString() === props.account.toString()
                                        ?<h5>PLEASE WAIT FOR THE SELLER TO ACCEPT THE REQUEST</h5>
                                        :<h5>THIS PROPERTY HAS BEEN REQUESTED BY SOMEONE ELSE<br/>YOU CAN WAIT AND WISH IT WILL BE REJECTED</h5>
                                :property.status === "Accepted"
                                    ?property.sellerAddress.toString() === props.account.toString()
                                        ?<h5>PLEASE WAIT FOR THE BUYER TO SIGN THE AGREEMENT</h5>
                                        :property.signedBy.toString() === props.account.toString()
                                            ?<div>
                                                <h4>AGREEMENT</h4>
                                                <h5 className="agreement">Buy signing this agreement you are declaring that you'll pay <b>Holding Deposit of {holding} ETH</b> and<br/><br/> <b>within {due} days</b>, you'll pay the <b>Full Price of {fullPrice} ETH</b>. And if you fail to pay the full price within the time, <br/><br/> <b>your holding deposit of {holding} ETH wont be refunded!!</b></h5>
                                                <button className="buyprop" onClick={() => {props.changeStatus(property.id.toNumber(), "Signed")}}>SIGN THE AGREEMENT</button>
                                                <h5>You are signing as<br/><br/>Account : {props.account.toString()}<br/><br/>Date : {(new Date()).toString()}</h5>
                                            </div>
                                            :<h5>THIS PROPERTY HAS BEEN REQUESTED BY SOMEONE ELSE<br/><br/>YOU CAN WAIT AND WISH IT WILL BE REJECTED</h5>
                                    :property.status === "Signed"
                                        ?property.sellerAddress.toString() === props.account.toString()
                                            ?<h5>WAITING FOR BUYER TO SEND THE HOLDING DEPOSIT</h5>
                                            :property.signedBy.toString() === props.account.toString()
                                                ?<button className="buyprop" onClick={() => { props.sendHoldingDeposit(property.id, window.web3.utils.toWei(holding.toString(), 'Ether')) }}>SEND HOLDING DEPOSIT</button>
                                                :<h5>THIS PROPERTY HAS BEEN SIGNED BY SOMEONE ELSE.</h5>
                                        :property.status === "On Hold"
                                            ?property.sellerAddress.toString() === props.account.toString()
                                                ?<h5>YOUR PROPERTY IS ON HOLD<br/><br/>DAYS LEFT :: {parseInt(due)-parseInt(Math.abs(new Date(dateHeld)-new Date())/60/60/24/1000)}</h5>
                                                :property.signedBy.toString() === props.account.toString()
                                                    ?<div>
                                                        <h5>YOUR PROPERTY IS ON HOLD<br/><br/>DAYS LEFT :: {parseInt(due)-parseInt(Math.abs(new Date(dateHeld)-new Date())/60/60/24/1000)}</h5>
                                                        <button className="buyprop" onClick={() => { props.sendFullPrice(property.id, window.web3.utils.toWei(fullPrice.toString(), 'Ether')) }}>SEND FULL PRICE</button>
                                                    </div>
                                                    :<h5>THIS PROPERTY HAS BEEN SIGNED BY SOMEONE ELSE.</h5>
                                            :<h5>Idela Jarigindhi Mowa</h5>
                    }
                </div>
            </div>
        </div>
    )
}

export default PropPage