'use client'
import React from "react";

export default function ReturnButton() {
    
    return(
        <a href='/' className="btn btn-secondary btn-sm"> 
            <img src="/arrow-back.svg" width={30} style={{display: 'inline'}} alt="" />
            Powrót
        </a>
    )
}