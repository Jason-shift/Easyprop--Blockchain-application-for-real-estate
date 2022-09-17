import React from "react";

const PhotoSlides = (props) => {

    return (
        // <!--image slider start-->
        <div className="slider">
            <div className="slides">
                {/* <!--radio buttons start--> */}
                <input type="radio" name="radio-btn" id="radio1"/>
                <input type="radio" name="radio-btn" id="radio2"/>
                <input type="radio" name="radio-btn" id="radio3"/>
                <input type="radio" name="radio-btn" id="radio4"/>

                {/* <!--radio buttons end-->
                <!--slide images start--> */}
                <div className="slide first">
                <img src={`https://ipfs.io/ipfs/${props.image0}`} alt="loading from IPFS..."/>
                </div>
                <div className="slide">
                <img src={`https://ipfs.io/ipfs/${props.image1}`} alt="loading from IPFS..."/>
                </div>
                <div className="slide">
                <img src={`https://ipfs.io/ipfs/${props.image2}`} alt="loading from IPFS..."/>
                </div>
                <div className="slide">
                <img src={`https://ipfs.io/ipfs/${props.image3}`} alt="loading from IPFS..."/>
                </div>
                {/* <!--slide images end-->
                <!--automatic navigation start--> */}
                <div className="navigation-auto">
                <div className="auto-btn1"></div>
                <div className="auto-btn2"></div>
                <div className="auto-btn3"></div>
                <div className="auto-btn4"></div>
                </div>
                {/* <!--automatic navigation end--> */}
            </div>
            {/* <!--manual navigation start--> */}
            <div className="navigation-manual">
                <label htmlFor="radio1" className="manual-btn"></label>
                <label htmlFor="radio2" className="manual-btn"></label>
                <label htmlFor="radio3" className="manual-btn"></label>
                <label htmlFor="radio4" className="manual-btn"></label>
            </div>
            {/* <!--manual navigation end--> */}
        </div>
        // {/* <!--image slider end--></input> */}
    )
}

export default PhotoSlides