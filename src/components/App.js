import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './ScrollToTop'
import Navbar from './Navbar';
import PropPage from './PropPage';
import AddProperty from './AddProperty';
import Explore from './Explore';
import MyProperties from './MyProperties';
import AllHouses from './AllHouses';
import AllApartments from './AllApartments';
import SellProperty from './SellProperty';
import Footer from './Footer';

import Web3 from 'web3';

import EasyProp from '../abis/EasyProp.json';

class App extends Component {

  async componentWillMount() {
    // console.log("DidMount")
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    // console.log("loadweb3")
    if(window.etherium){
      window.web3 = new Web3(window.etherium)
      await window.etherium.enable()
    } else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert("Non-Etherium browser detected. You should consider trying MetaMask")
    }
  }

  async loadBlockchainData() {
    // console.log("load bc")
    const web3 = window.web3

    //Load accounts
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkID = await web3.eth.net.getId()
    const networkData = EasyProp.networks[networkID]

    if(networkData){  
      const easyprop = web3.eth.Contract(EasyProp.abi, networkData.address)
      console.log(networkData.address)
      this.setState({ easyprop })
      const propCount = await easyprop.methods.propCount().call()
      this.setState({ propCount })
      for(var i = 1; i <= propCount; i++){
        const property = await easyprop.methods.properties(i).call();
        const propType = property.propType
        if(propType === "House"){
          this.setState({ houseCount: this.state.houseCount + 1, houses: [...this.state.houses, property] })
        } else if(propType === "Apartment"){
          this.setState({ apartmentCount: this.state.apartmentCount + 1, apartments: [...this.state.apartments, property] })
        }
        this.setState({
          properties: [...this.state.properties, property]
        })
      }
      const myPropCount = await easyprop.methods.getUserPropsCount(this.state.account).call()
      this.setState({ myPropCount })
      for(i=0; i<this.state.myPropCount; i++){
        const propId = await easyprop.methods.userProps(this.state.account, i).call()
        const property = await easyprop.methods.properties(propId).call();
        this.setState({
          myProperties: [...this.state.myProperties, property]
        })
      }
      console.log(propCount.toNumber())
      this.setState({ loading: false })
    } else {
      window.alert("EasyProp contract not deployed to the network!!")
    }

    
    // console.log(this.state.account)
  }

  constructor(props){
    // console.log("Const")
    super(props)
    this.state = {
      account: 'jason',
      propCount: 0,
      properties: [],
      houseCount: 0,
      houses: [],
      apartmentCount: 0,
      apartments: [],
      myProperties: [],
      myPropCount: 0,
      loading: true
    }

    this.addProperty = this.addProperty.bind(this)
    this.getLocations = this.getLocations.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.getPhotos = this.getPhotos.bind(this)
    this.getSellerDetails = this.getSellerDetails.bind(this)
    this.getPriceAndTime = this.getPriceAndTime.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.sendHoldingDeposit = this.sendHoldingDeposit.bind(this)
    this.sendFullPrice = this.sendFullPrice.bind(this)
    this.sellProperty = this.sellProperty.bind(this)
    this.getAllOwners = this.getAllOwners.bind(this)
  }

  addProperty(type, title, description, locations, rooms, photos, sellerDetails, priceandTime) {
    this.setState({ loading: true })
    priceandTime.push('Req date not set yet')
    this.state.easyprop.methods.addProperty(type, title, description, locations, rooms, photos, sellerDetails, priceandTime).send({ from: this.state.account })
    .once('recipt', (recipt) => {
      this.setState({ loading: false })
    })
  }

  sellProperty(id, sellerDetails, priceandTime) {
    priceandTime.push('Req date not set yet')
    this.state.easyprop.methods.sellProperty(id, sellerDetails, priceandTime).send({ from: this.state.account })
    .once('recipt', (recipt) => {
    })
  }

  getLocations(id, index){
    return this.state.easyprop.methods.getLocations(parseInt(id), parseInt(index)).call({ from: this.state.account })
  }

  getRooms(id, index){
    return this.state.easyprop.methods.getRooms(parseInt(id), parseInt(index)).call({ from: this.state.account })
  }

  getPhotos(id, index){
    return this.state.easyprop.methods.getPhotos(parseInt(id), parseInt(index)).call({ from: this.state.account })
  }

  getSellerDetails(id, index){
    return this.state.easyprop.methods.getSellerDetails(parseInt(id), parseInt(index)).call({ from: this.state.account })
  }

  getPriceAndTime(id, index){
    return this.state.easyprop.methods.getPriceAndTime(parseInt(id), parseInt(index)).call({ from: this.state.account })
  }

  changeStatus(id, status){
    this.state.easyprop.methods.changeStatus(parseInt(id), status).send({ from: this.state.account })
    .once('recipt', (recipt) => {})
  }

  sendHoldingDeposit(id, value) {
    const today = new Date()
    this.state.easyprop.methods.sendHoldingDeposit(parseInt(id), today.toString()).send({ from: this.state.account, value: value })
    .once('recipt', (recipt) => {
      console.log("Ether Sent")
    })
  }

  sendFullPrice(id, value) {
    this.state.easyprop.methods.sendFullPrice(parseInt(id)).send({ from: this.state.account, value: value })
    .once('recipt', (recipt) => {
      console.log("Ether Sent")
    })
  }

  async getAllOwners(id) {
    let owners = []
    let ownersCount = await this.state.easyprop.methods.getOwnersCount(id).call()
    for(let i=0;i<ownersCount-1;i++) {
      let owner = await this.state.easyprop.methods.owners(id, i).call()
      owners = [...owners, owner]
    }
    return owners
  }

  render() {
    return (
      <div className="App">
        <Router onUpdate={() => window.scrollTo(0, 0)}>
          <ScrollToTop />
          <Navbar account={ this.state.account }/>
          <Switch>
            <Route path='/' exact>
              <Explore 
                houseCount={this.state.houseCount} 
                houses={ this.state.houses } 
                apartmentCount={this.state.apartmentCount} 
                apartments={ this.state.apartments }
                
                properties={this.state.properties}
                account={this.state.account}
                getLocations={this.getLocations}
                getRooms={this.getRooms}
                getImage={this.getPhotos}
                getSellerDetails={this.getSellerDetails}
                getPriceAndTime={this.getPriceAndTime}
              />
            </Route>
            <Route path='/myproperties' exact>
              <MyProperties 
                account={this.state.account}
                myProperties={this.state.myProperties}
                getLocations={this.getLocations}
                getRooms={this.getRooms}
                getImage={this.getPhotos}
                getSellerDetails={this.getSellerDetails}
                getPriceAndTime={this.getPriceAndTime}
              />
            </Route>
            <Route path='/addproperty' exact>
              <AddProperty addProperty={ this.addProperty } account={ this.state.account } propCount={ this.state.propCount }/>
            </Route>
            <Route path='/houses' exact>
              <AllHouses
                houses={ this.state.houses }
                getLocations={this.getLocations}
                getRooms={this.getRooms}
                getImage={this.getPhotos}
                getSellerDetails={this.getSellerDetails}
                getPriceAndTime={this.getPriceAndTime}
              />
            </Route>
            <Route path='/apartments' exact>
              <AllApartments 
                apartments={ this.state.apartments }
                getLocations={this.getLocations}
                getRooms={this.getRooms}
                getImage={this.getPhotos}
                getSellerDetails={this.getSellerDetails}
                getPriceAndTime={this.getPriceAndTime}
              />
            </Route>
            <Route path='/proppage/:propId' exact>
              <PropPage 
                properties={this.state.properties}
                account={this.state.account}

                getLocations={this.getLocations}
                getRooms={this.getRooms}
                getImage={this.getPhotos}
                getSellerDetails={this.getSellerDetails}
                getPriceAndTime={this.getPriceAndTime}
                changeStatus={this.changeStatus}
                sendHoldingDeposit={this.sendHoldingDeposit}
                sendFullPrice={this.sendFullPrice}
                getAllOwners={this.getAllOwners}
              />
            </Route>
            <Route path='/sellprop/:propId' exact>
              <SellProperty 
                sellProperty={this.sellProperty}
                account={this.state.account}
              />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
