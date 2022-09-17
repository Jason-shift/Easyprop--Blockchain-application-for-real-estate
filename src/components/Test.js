import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Test = props => {
    const location = useLocation();

    useEffect(() => {
       console.log(location.pathname); // result: '/secondpage'
       console.log(location.search); // result: '?query=abc'
       console.log(location.state.detail); // result: 'some_value'
    }, [location]);

};

export default Test;