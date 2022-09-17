pragma solidity >=0.4.21 <0.9.0;
//SPDX-License-Identifier: UNLICENSED

contract EasyProp {
    uint public propCount;
    mapping(uint=>Property) public properties;
    mapping(address => uint[]) public userProps;
    mapping(uint => address[]) public owners;

    struct Property {
        uint id;
        string propType;
        string title;
        string description;
        string[5] locations;
        uint[6] rooms;
        string[4] photos;
        string[2] sellerDetails;
        address payable sellerAddress;
        string[5] priceandTime;
        string status;
        address signedBy;
        bool purchased;
    }

    event PropertyAdded(
        uint id,
        string propType,
        string title,
        string description,
        string[5] locations,
        uint[6] rooms,
        string[4] photos,
        string[2] sellerDetails,
        address payable sellerAddress,
        string[5] priceandTime,
        string status,
        address signedBy,
        bool purchased
    );

    event PropertyHeld(
        uint id,
        string propType,
        string title,
        string description,
        string[5] locations,
        uint[6] rooms,
        string[4] photos,
        string[2] sellerDetails,
        address payable sellerAddress,
        string[5] priceandTime,
        string status,
        address signedBy,
        bool purchased
    );

    event ReqSent(
        uint id,
        address reqBy
    );

    event ReqAcc(
        uint id,
        address accBy
    );
    event ReqRej(
        uint id,
        address rejBy
    );
    event Signed(
        uint id,
        address signedBy
    );

    constructor() {
        propCount = 0;
    }

    modifier onlyOwner(uint _id) {
        require(msg.sender == properties[_id].sellerAddress);
        _;
    }

    modifier notOwner(uint _id) {
        require(msg.sender != properties[_id].sellerAddress);
        _;
    }

    function addProperty ( 
            string memory _propType,
            string memory _title,
            string memory _description,
            string[5] memory _locations,
            uint[6] memory _rooms,
            string[4] memory _photos,
            string[2] memory _sellerDetails,
            string[5] memory _priceandTime
        ) public {
            //makesure the parameters are correct

            //Increment house count
            propCount++;

            //Add to the mapping
            properties[propCount] = Property(propCount, _propType, _title, _description, _locations, _rooms, _photos, _sellerDetails, payable(msg.sender), _priceandTime, "Not Requested", address(0x0), false);

            //Add owner to owners
            owners[propCount].push(msg.sender);

            //Update user props
            userProps[msg.sender].push(propCount);

            //Trigger an event
            emit PropertyAdded(propCount, _propType, _title, _description, _locations, _rooms, _photos, _sellerDetails, payable(msg.sender), _priceandTime, "Not Requested", address(0x0), false);
            
        }

    function sellProperty(uint _id, string[2] memory _sellerDetails,string[5] memory _priceandTime) public {
        Property memory _property = properties[_id];

        //Change Details
        _property.sellerDetails = _sellerDetails;
        _property.priceandTime = _priceandTime;
        _property.status = "Not Requested";
        _property.signedBy = address(0x0);
        _property.purchased = false;

        //Update in properties
        properties[_id] = _property;
    } 

    //for displaying
    function getLocations(uint _id, uint _index) public view returns(string memory) {
        return properties[_id].locations[_index];
    }

    function getRooms(uint _id, uint _index) public view returns(uint) {
        return properties[_id].rooms[_index];
    }

    function getPhotos(uint _id, uint _index) public view returns(string memory) {
        return properties[_id].photos[_index];
    }

    function getSellerDetails(uint _id, uint _index) public view returns(string memory) {
        return properties[_id].sellerDetails[_index];
    }

    function getPriceAndTime(uint _id, uint _index) public view returns(string memory) {
        return properties[_id].priceandTime[_index];
    }

    function getUserPropsCount(address user) public view returns (uint){
        return userProps[user].length;
    }

    function getOwnersCount(uint _id) public view returns (uint){
        return owners[_id].length;
    }


    //Change Status
    //=============
    function changeStatus(uint _id, string memory _status) public {
        address seller = address(properties[_id].sellerAddress);
        if(keccak256(bytes(_status)) == keccak256("Not Requested")){
            require(msg.sender == seller);
            properties[_id].status = _status;
            properties[_id].signedBy = address(0x0);
        } else if (keccak256(bytes(_status)) == keccak256("Requested")){
            require(msg.sender != seller);
            properties[_id].status = _status;
            properties[_id].signedBy = msg.sender;
        }else if (keccak256(bytes(_status)) == keccak256("Accepted")){
            require(msg.sender == seller);
            properties[_id].status = _status;
        } else if(keccak256(bytes(_status)) == keccak256("Signed")){
            require(msg.sender != seller);
            properties[_id].status = _status;
            properties[_id].signedBy = msg.sender;
        }
    }


    //Hold Prop
    //=========
    function sendHoldingDeposit(uint _id, string memory dateHeld) public payable notOwner(_id) {
        //Fetch the prop
        Property memory _property = properties[_id];
        //Makesure the prop is available
        require(_property.purchased == false);
        //Fetch the owner
        address payable _seller = _property.sellerAddress;
        //Set Date Held
        _property.priceandTime[4] = dateHeld;
        //Pay the seller
        _seller.transfer(msg.value);
        //Put on hold
        _property.status = "On Hold";
        //Add changes
        properties[_id] = _property;
        //Trigger an event
        emit PropertyHeld(propCount, _property.propType, _property.title, _property.description, _property.locations, _property.rooms, _property.photos, _property.sellerDetails, _seller, _property.priceandTime, "No Req", msg.sender, true);
    }

    //Buy Prop
    //========
    function sendFullPrice(uint _id) public payable notOwner(_id) {
        //Fetch the prop
        Property memory _property = properties[_id];
        //Make sure that the date is not expired
        //Makesure the prop is available
        require(_property.purchased == false);
        //Fetch the owner
        address payable _seller = _property.sellerAddress;
        //Pay the seller
        _seller.transfer(msg.value);
        //Change User Props
        userProps[msg.sender].push(_id);
        for(uint i=0;i < userProps[address(_seller)].length; i++){
            if(userProps[address(_seller)][i] == _id){
                delete userProps[address(_seller)][i];
                break;
            }
        }
         //add to owners
        owners[_id].push(msg.sender);
        //Change Ownership
        _property.sellerAddress=payable(msg.sender);
        //Change Purchase status
        _property.purchased = true;
        _property.status = "No Req";
        //Add Changes
        properties[_id]=_property;
        //Trigger an event
        emit PropertyHeld(propCount, _property.propType, _property.title, _property.description, _property.locations, _property.rooms, _property.photos, _property.sellerDetails, payable(msg.sender), _property.priceandTime, "No Req", address(0x0), true);
    }


}