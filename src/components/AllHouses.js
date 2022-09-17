import React, { Component } from "react";

import { BsHouseFill } from 'react-icons/bs'

import Singlebox from "./Singlebox";


class AllHouses extends Component {
  render() {
    return(
      <div className="wrapper">
        <h1 className="heading">List of Houses <BsHouseFill /></h1>
        <div className="grid-container">
          {
            this.props.houses.map((property, key) => {
              return (
                <div className="grid-item" key={key}>
                  <Singlebox 
                    id={property.id}
                    purchased={property.purchased}
                    getImage={this.props.getImage}
                    nameOfProp={property.title.toString()} 
                    getPriceAndTime={this.props.getPriceAndTime}
                    getLocations={this.props.getLocations}
                    getRooms={this.props.getRooms}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
  )
  }
}

export default AllHouses