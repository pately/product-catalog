import React from 'react'
import { useState, useEffect } from 'react';


const Product = ({ product }) => {
    const [info, setInfo] = useState({});

    const productStyle = {
        width: '200px',
        height: '200px'
    }
    return (
        <div>
            <p>This is Product {info.price}</p>
            <img style={productStyle} src={info.image} alt='' />
        </div>
    )
}

export default Product
