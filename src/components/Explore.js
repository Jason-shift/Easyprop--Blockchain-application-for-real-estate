import React, { Component } from "react";
import Photo from "./Photo";
import Houses from "./Houses";
import Apartments from "./Aparments";


class Explore extends Component {

  render() {
      return (
      <div>
        <Photo />
        <Houses 
          houseCount={this.props.houseCount} 
          houses={ this.props.houses } 
          account={this.props.account}
          getLocations={this.props.getLocations}
          getRooms={this.props.getRooms}
          getImage={this.props.getImage}
          getPriceAndTime={this.props.getPriceAndTime}
        />
        <Apartments 
          apartmentCount={this.props.apartmentCount} 
          apartments={ this.props.apartments }
          account={this.props.account}
          getLocations={this.props.getLocations}
          getRooms={this.props.getRooms}
          getImage={this.props.getImage}
          getPriceAndTime={this.props.getPriceAndTime}

        />
      </div>
    )
  }
}

export default Explore