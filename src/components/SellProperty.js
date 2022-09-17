import React, { useState } from "react";
import { useParams } from "react-router";
import ipfs from "./ipfs";
import Loader from "./Loader";


const SellProperty = (props) => {
  
  const { propId } = useParams()
  const [ ipfsHash5, setIpfsHash5 ] = useState('')
  const [ title_doc, setTitleDoc ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  return(
    <div>
    <form onSubmit={(event) => {
      event.preventDefault()
      const sellerDetails = [ document.getElementById("seller-name").value, document.getElementById("seller-phone").value ]
      const priceandTime = [ window.web3.utils.toWei(document.getElementById("holding-deposit").value.toString(), 'Ether'), window.web3.utils.toWei(document.getElementById("full-price").value.toString(), 'Ether'), document.getElementById("due").value, ipfsHash5 ]

      props.sellProperty(propId, sellerDetails, priceandTime)
    }}>
      <div className='property-det-div'>
        <h4>Seller details</h4>
        <div className='details-row'>
          <div className='prop-type'>
            <label htmlFor="seller-name"><h5>Seller Name</h5></label>
              <input type="text" name="seller-name" id="seller-name" placeholder='Batman' required/>
          </div>
          <div className='prop-type'>
            <label htmlFor="seller-phone"><h5>Seller Phone</h5></label>
              <input type="tel" name="seller-phone" id="seller-phone" placeholder='9876543210' pattern="[0-9]{10}" required />
          </div>
        </div>
        <div className='details-row'>
          <div className='seller-account'>
            <label htmlFor="seller-account"><h5>Seller Account Address</h5></label>
              <input type="text" name="seller-account" id="seller-account" value={ props.account } readOnly/>
          </div>
        </div>
      </div>
      <div className="line" />
      <div className='property-det-div'>
        <h4>Price and Agrements details</h4>
        <div className='details-row'>
          <div className='prop-type'>
            <label htmlFor="holding-deposit"><h5>Holding Deposit</h5></label>
            <input type="number" name="holding-deposit" id="holding-deposit" min='0' max='3' step='0.001' placeholder='ETH' required/>
          </div>
          <div className='prop-type'>
            <label htmlFor="full-price"><h5>Full Price</h5></label>
            <input type="number" name="full-price" id="full-price" min='0' step='0.001' placeholder='ETH' required />
          </div>
        </div>
        <div className='details-row'>
          <div className='prop-type'>
            <label htmlFor="due"><h5>Time duration for Holding</h5></label>
            <input type="number" name="due" id="due" min='30' placeholder='minimum time is 30 days' required/>
          </div>
          <div className='prop-type'>
            <label htmlFor="title-doc"><h5>Title Documet</h5></label>
            <input onChange={(event) => {
              event.preventDefault()
              const target = event.target;
              const file_name = target.name
              console.log(file_name)
              const file = target.files[0]
              console.log(file)
              const reader = new window.FileReader()
              reader.readAsArrayBuffer(file)
              reader.onloadend = () => {
                if(file_name === "title-doc") {
                  setLoading(true)
                  setTitleDoc(Buffer(reader.result))
                  ipfs.files.add( title_doc, (error, result) => {
                    if(error){
                      console.error(error)
                      return
                    }
                    setIpfsHash5(result[0].hash)
                  })
                  setLoading(false)
                }
              }
            }} type="file" name="title-doc" id="title-doc" className='title-doc'/>
          </div>
        </div>
      </div>
        { loading
            ?<Loader />
            :<button className='addprop'>ADD AND LIST THIS PROPERTY</button>
        }
    </form>
    </div>
    )
}

export default SellProperty