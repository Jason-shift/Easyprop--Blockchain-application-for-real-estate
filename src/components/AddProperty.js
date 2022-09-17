import React, { Component } from 'react'
import ipfs from './ipfs';

import Loader from './Loader'

class AddProperty extends Component {

  captureFile(event) {
    event.preventDefault()
    const target = event.target;
    const file_name = target.name
    const file = target.files[0]
    const reader = new window.FileReader()
    console.log(file)
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      if(file_name === 'prop-img-1'){
        this.setState({ loading: true })
        this.setState({ image_1: Buffer(reader.result)})
        ipfs.files.add( this.state.image_1, (error, result) => {
          if(error){
            console.error(error)
            return
          }
    
          this.setState({ ipfsHash1: result[0].hash })
          console.log(this.state.ipfsHash1)
        })
        this.setState({ loading: false })
      } else if (file_name === 'prop-img-2'){
        this.setState({ loading: true })
        this.setState({ image_2: Buffer(reader.result)})
        ipfs.files.add( this.state.image_2, (error, result) => {
          if(error){
            console.error(error)
            return
          }
    
          this.setState({ ipfsHash2: result[0].hash })
        })
        this.setState({ loading: false })
      } else if (file_name === 'prop-img-3'){        
        this.setState({ loading: true })
        this.setState({ image_3: Buffer(reader.result) })
        ipfs.files.add( this.state.image_3, (error, result) => {
          if(error){
            console.error(error)
            return
          }
    
          this.setState({ ipfsHash3: result[0].hash })
        })
        this.setState({ loading: false })
      } else if (file_name === 'prop-img-4'){
        this.setState({ loading: true })
        this.setState({ image_4: Buffer(reader.result)})
        ipfs.files.add( this.state.image_4, (error, result) => {
          if(error){
            console.error(error)
            return
          }
    
          this.setState({ ipfsHash4: result[0].hash })
        })
        this.setState({ loading: false })
      } else {
        this.setState({ loading: true })
        this.setState({ title_doc: Buffer(reader.result) })
        ipfs.files.add( this.state.title_doc, (error, result) => {
          if(error){
            console.error(error)
            return
          }

          this.setState({ ipfsHash5: result[0].hash })
        })
        this.setState({ loading: false })
      }
    }
  }

  uploadFiles(event) {
    console.log("Files Uploades")
  }

  constructor(props) {
    super(props)
    this.state = {
      ipfsHash1: "",
      ipfsHash2: "",
      ipfsHash3: "",
      ipfsHash4: "",
      ipfsHash5: "",
      loading: false,
      image_1: null,
      image_2: null,
      image_3: null,
      image_4: null,
      title_doc: null
    }
    this.captureFile = this.captureFile.bind(this)
    this.uploadFiles = this.uploadFiles.bind(this)
  }

  render() {
    return (
      <div className='property-form'>
        <h1>Please fill out the following to list your Property</h1>
        <div className='warpper'>
          <form onSubmit={(event) => {
            event.preventDefault()
            const type = document.getElementById("prop-type").value
            const title = document.getElementById("prop-title").value
            const description = document.getElementById("prop-desc").value
            const locations = [ document.getElementById("prop-country").value, document.getElementById("prop-city").value, document.getElementById("prop-door-number").value, document.getElementById("prop-street").value, document.getElementById("prop-pin").value ]
            const rooms = [ parseInt(document.getElementById("prop-living").value), parseInt(document.getElementById("prop-bed").value), parseInt(document.getElementById("prop-bath").value), parseInt(document.getElementById("prop-kitchen").value), parseInt(document.getElementById("prop-other").value), parseInt(document.getElementById("prop-garage").value) ]
            const photos = [ this.state.ipfsHash1, this.state.ipfsHash2, this.state.ipfsHash3, this.state.ipfsHash4 ]
            const sellerDetails = [ document.getElementById("seller-name").value, document.getElementById("seller-phone").value ]
            const priceandTime = [ window.web3.utils.toWei(document.getElementById("holding-deposit").value.toString(), 'Ether'), window.web3.utils.toWei(document.getElementById("full-price").value.toString(), 'Ether'), document.getElementById("due").value, this.state.ipfsHash5 ]
            // console.log(document.getElementById("full-price").value, document.getElementById("holding-deposit").value)

            this.props.addProperty(type, title, description, locations, rooms, photos, sellerDetails, priceandTime)
          }} >
            <div className='property-det-div'>
              <h4>Property description</h4>
              <div className='prop-title'>
                <label htmlFor="prop-title"><h5>Property Title</h5></label>
                <input type="text" name="prop-title" id="prop-title" ref={(input) => { this.propTitle = input }} placeholder='Scott Manner' required/>
              </div>
              <div className='prop-desc'>
                <label htmlFor="prop-desc"><h5>Property Description</h5></label>
                <textarea rows="10" cols="50" name="prop-desc" id="prop-desc" ref={(input) => { this.propDesc = input }} placeholder="Write 'bout your houese here........" required/>
              </div>
            </div>
            <div className="line" />
            <div className='property-det-div'>
              <h4>Type and Location</h4>
              <div className='details-row'>
                <div className='prop-type'>
                  <label htmlFor="prop-type"><h5>Type</h5></label>
                  <select name='prop-type' id='prop-type' ref={(input) => { this.propType = input }} required>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>
                <div className='prop-type'>
                  <label htmlFor='prop-country'><h5>Country</h5></label>
                  <input type="text" name='prop-country' id='prop-country' ref={(input) => { this.propCountry = input }} placeholder='India' required/>
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-city"><h5>City</h5></label>
                  <input type="tetx" name="prop-city" id="prop-city" placeholder='Vijayawada' ref={(input) => { this.propCity = input }} required/>
                </div>
              </div>
              <div className='details-row'>
                <div className='prop-type'>
                  <label htmlFor="prop-door-number"><h5>Door-number</h5></label>
                  <input type="text" name='prop-door-number' id='prop-door-number' placeholder='1-A67' ref={(input) => { this.propDNo = input }} required/>
                </div>
                <div className='prop-type'>
                  <label htmlFor='prop-street'><h5>street</h5></label>
                  <input type="text" name='prop-street' id='prop-street' placeholder='ABD Street' ref={(input) => { this.propStreet = input }} required/>
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-pin"><h5>Pin-code</h5></label>
                  <input type="tel" name="prop-pin" id="prop-pin" placeholder='123456' pattern='[0-9]{6}' ref={(input) => { this.propPin = input }} required/>
                </div>
              </div>
            </div>
            <div className="line" />
            <div className='property-det-div'>
              <h4>Rooms</h4>
              <div className='details-row'>
                <div className='prop-type'>
                  <label htmlFor="prop-living"><h5>Livingrooms Count</h5></label>
                  <input type="number" className='prop-living' id='prop-living' min="0" max="5" ref={(input) => { this.propLiv = input }} />
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-bed"><h5>Bedrooms Count</h5></label>
                  <input type="number" className='prop-bed' id='prop-bed' min="0" max="5" ref={(input) => { this.propBed = input }} />
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-bath"><h5>Bathrooms Count</h5></label>
                  <input type="number" className='prop-bath' id='prop-bath' min="0" max="5" ref={(input) => { this.propBath = input }} />
                </div>
              </div>
              <div className='details-row'>
                <div className='prop-type'>
                  <label htmlFor="prop-kitchen"><h5>Kitchen Count</h5></label>
                  <input type="number" className='prop-kitchen' id='prop-kitchen' min="0" max="2" ref={(input) => { this.propKit = input }} />
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-other"><h5>Other rooms</h5></label>
                  <input type="number" name="prop-other" id="prop-other" min="0" max="2" ref={(input) => { this.propOth = input }} />
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-garage"><h5>Garage</h5></label>
                  <input type="number" name="prop-garage" id="prop-garage" min="0" max="2" ref={(input) => { this.propGarage = input }} />
                </div>
              </div>
            </div>
            <div className="line" />
            <div className='property-det-div'>
              <h4>Property Galayry</h4>
              <div className='details-row'>
                <div className='prop-type'>
                  <label htmlFor="prop-img-1"><h5>{this.state.loading ?<Loader /> :<img src={`https://ipfs.io/ipfs/${this.state.ipfsHash1}`} alt="First" height="100" />}</h5></label>
                  <input type="file" name="prop-img-1" id="prop-img-1" onChange={this.captureFile} />
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-img-2"><h5>{this.state.loading ?<Loader /> :<img src={`https://ipfs.io/ipfs/${this.state.ipfsHash2}`} alt="Second" height="100" />}</h5></label>
                  <input type="file" name="prop-img-2" id="prop-img-2" onChange={this.captureFile} />
                </div>
              </div>
              <div className='details-row'>
                <div className='prop-type'>
                  <label htmlFor="prop-img-3"><h5>{this.state.loading ?<Loader /> :<img src={`https://ipfs.io/ipfs/${this.state.ipfsHash3}`} alt="Third" height="100" />}</h5></label>
                  <input type="file" name="prop-img-3" id="prop-img-3" onChange={this.captureFile} />
                </div>
                <div className='prop-type'>
                  <label htmlFor="prop-img-4"><h5>{this.state.loading ?<Loader /> :<img src={`https://ipfs.io/ipfs/${this.state.ipfsHash4}`} alt="Fourth" height="100" />}</h5></label>
                  <input type="file" name="prop-img-4" id="prop-img-4" onChange={this.captureFile} />
                </div>
              </div>
            </div>
            <div className="line" />
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
                  <input type="text" name="seller-account" id="seller-account" value={ this.props.account } readOnly/>
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
                  <input type="file" name="title-doc" id="title-doc" className='title-doc' onChange={this.captureFile} />
                </div>
              </div>
            </div>
            { this.state.loading
              ?<Loader />
              :<button className='addprop' onClick={ this.addProperty }>ADD AND LIST THIS PROPERTY</button>
            }
          </form>
        </div>        
      </div>
    )
  }
}

export default AddProperty