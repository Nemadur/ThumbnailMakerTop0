'use client'
import React, { useRef } from "react";
import ReturnButton from "@/components/ReturnButton";

export default function wc3() {
    const imageHeight = 650;
    const imageWidth = 460;
    const textStart = 930;

    const mainColor = useRef();
    const bgColor = useRef();
    const correctionX = useRef();
    const correctionY = useRef();
    
    const createTitle = (ctx: any, count: number) => {

        const moveX = (correctionX.current) ? parseInt(correctionX.current.value) : 0 ;
        const moveY = (correctionY.current) ? parseInt(correctionY.current.value) : 0 ;
        const colorMain = (mainColor.current) ? mainColor.current.value : '#fff' ;
        const colorBG = (bgColor.current) ? bgColor.current.value : '#000' ;

        debugger;

        ctx.font = "bold 60px calibri";
        ctx.fillStyle = colorBG
        ctx.fillText("KAMPANIA", textStart, 80);
        ctx.fillText("CO-OP #" + count, textStart, 150);
        ctx.fillText("IMPOSSIBLE", textStart, 220);

        ctx.fillStyle = colorMain
        ctx.fillText("KAMPANIA", textStart + moveX, 80 + moveY);
        ctx.fillText("CO-OP #" + count, textStart + moveX, 150  + moveY);
        ctx.fillText("IMPOSSIBLE", textStart + moveX, 220  + moveY);
    }

    const createThumbnail = (card: any, counter: any, background: any) => {
        const tableRow = document.createElement('tr');
        const tableCell  = document.createElement('td');
        const idCell  = document.createElement('td');
        idCell.innerHTML = counter

        const newThumbnail = document.createElement('canvas')
        newThumbnail.width = 1280
        newThumbnail.height = 720
        newThumbnail.id = `thumbnail-${counter}`

        const ctx = newThumbnail.getContext("2d");
    
        ctx.drawImage(background, 0, 0);
        createTitle(ctx, counter);
        ctx.drawImage(card, 20, 30, imageWidth, imageHeight);

        tableCell.appendChild(newThumbnail)
        tableRow.appendChild(idCell)
        tableRow.appendChild(tableCell)

        document.getElementById('main').appendChild(tableRow)
    }


    function generateThumbnails() {
        document.querySelector("#main").innerHTML = "";
        document.querySelector("#audio").play()

        const cards = document.querySelector('#fileItems');
        const background = document.querySelector('#fileBackground')
        var correction = document.getElementById('thumbnailCount').value
        
        const base = document.createElement('img')

        var backgroundFile = background.files[0]
        var bgReader = new FileReader();
        bgReader.onload = function(event) {
            base.src = event.target.result;

            base.addEventListener("load", () => {
                for (let index = 0; index < cards.files.length; index++) {
                    var file = cards.files.item(index);
                    
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        var cardImg = document.createElement('img');
                        cardImg.src = event.target.result;

                        cardImg.addEventListener("load", () => {
                            createThumbnail(cardImg, index + parseInt(correction), base)
                        });

                    };
                    reader.readAsDataURL(file);
                }
            });
        };
        
        bgReader.readAsDataURL(backgroundFile);
    }

    return (
        <>
            <ReturnButton/>

            <div style={{width: '50%', margin: 'auto'}}>
                
                <div className="mb-3 fileSelect">
                    <label htmlFor="fileBackground" className="form-label">Plik tła</label>
                    <input className="form-control" type="file" id="fileBackground" />
                </div>
                <div className="mb-3 fileSelect">
                    <label htmlFor="fileItems" className="form-label">Pliki kart</label>
                    <input className="form-control" type="file" id="fileItems" multiple />
                </div>
                <div className="mb-3 fileSelect">
                    <label htmlFor="fileItems" className="form-label">Kolor napisu</label>
                    <input className="form-control" ref={mainColor} defaultValue="#000000" />
                </div>

                <div className="mb-3 fileSelect" >
                    <div className="row">
                        <div className="col">
                            <label htmlFor="fileItems" className="form-label">Kolor Tła</label>
                            <input className="form-control" ref={bgColor} defaultValue="#ffffff" />
                        </div>
                        <div className="col">
                            <label htmlFor="fileItems" className="form-label">Korekta pionowa</label>
                            <input className="form-control" ref={correctionY} defaultValue="-4" />
                        </div>
                        <div className="col">
                            <label htmlFor="fileItems" className="form-label">Korekta pozioma</label>
                            <input className="form-control" ref={correctionX} defaultValue="5" />
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3 fileSelect">
                    <span className="input-group-text" id="basic-addon1">Zacznij od odcinka numer</span>
                    <input type="text" className="form-control" id="thumbnailCount" />
                </div>
                <div className="mb-3 fileSelect">
                    <button onClick={() => generateThumbnails()} type="button" className="btn btn-primary" style={{width: '100%'}}>Generuj #wc3 Thumbnail</button>
                    <audio id="audio">
                        <source  src="/top0Audio.wav"/>
                    </audio>
                </div>

            </div>

            <table id="toSort" className="sortable table">
                <thead>
                    <tr>
                    <th>id</th>
                    <th>Thumbnail</th>
                    </tr>
                </thead>
                <tbody id="main">

                </tbody>
            </table>
        </>
    )
}
