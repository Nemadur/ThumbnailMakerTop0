'use client'

import React from "react";

interface cardInterface {
    imageSrc: string, 
    title: string, 
    desc: string
    link: string
}

export default function Card(props: cardInterface) {
    const {imageSrc, title, desc, link} = props;

   return(
    <div className="card" style={{width: '18rem'}}>
        <div className="card-img-top" style={{ backgroundImage: `url(${imageSrc})`, width: '100%', height: '170px', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <a href={link} className="btn btn-primary">Do Kreatora</a>
        </div>
    </div>
   )
}