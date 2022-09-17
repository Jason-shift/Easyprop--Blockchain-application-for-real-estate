import React from "react";
import Singlebox from "./Singlebox";

const MyProperties = (props) => {
  return(
    <div className="wrapper">
      <div className="grid-container">
        {
          props.myProperties.map((property, key) => {
            if(property.sellerAddress === props.account){
              return (
                <div className="grid-item" key={key}>
                  <Singlebox 
                    id={property.id}
                    purchased={property.purchased}
                    getImage={props.getImage}
                    nameOfProp={property.title.toString()} 
                    getPriceAndTime={props.getPriceAndTime}
                    getLocations={props.getLocations}
                    getRooms={props.getRooms}
                  />
                </div>
              )
            } else {
              return( null )
            }
          })
        }
      </div>
    </div>
    )
}

export default MyProperties
