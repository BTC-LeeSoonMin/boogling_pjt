import React, { useState } from "react";

const AptDetailList = ({ AptPrice, AptDate, AptArea, AptFloor }) => {
    return (
        <ul>
            <li>{AptPrice}</li>
            <li>{AptDate}</li>
            <li>{AptArea}</li>
            <li>{AptFloor}</li>
        </ul> 
    );
}

export default AptDetailList;