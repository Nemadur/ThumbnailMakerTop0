'use client'
import React from "react";
import ReturnButton from "@/components/ReturnButton";

export default function wc3() {
    const imageHeight = 650;
    const imageWidth = 460;
    const textStart = 930;
    
    const createTitle = (ctx: any, count: number) => {
        const mainColor = document.querySelector('#MainColor').value;
        const bgColor = document.querySelector('#BgColor').value;
        const correctionY = parseInt(document.querySelector('#BgCorrectionY').value);
        const correctionX = parseInt(document.querySelector('#BgCorrectionX').value);

        ctx.font = "bold 60px calibri";
        ctx.fillStyle = bgColor
        ctx.fillText("KAMPANIA", textStart, 80);
        ctx.fillText("CO-OP #" + count, textStart, 150);
        ctx.fillText("IMPOSSIBLE", textStart, 220);

        ctx.fillStyle = mainColor
        ctx.fillText("KAMPANIA", textStart + correctionX, 80 + correctionY);
        ctx.fillText("CO-OP #" + count, textStart + correctionX, 150  + correctionY);
        ctx.fillText("IMPOSSIBLE", textStart + correctionX, 220  + correctionY);
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
                    <input className="form-control" id="MainColor" defaultValue="#000000" />
                </div>

                <div className="mb-3 fileSelect" >
                    <div className="row">
                        <div className="col">
                            <label htmlFor="fileItems" className="form-label">Kolor Tła</label>
                            <input className="form-control" id="BgColor" defaultValue="#ffffff" />
                        </div>
                        <div className="col">
                            <label htmlFor="fileItems" className="form-label">Korekta pionowa</label>
                            <input className="form-control" id="BgCorrectionY" defaultValue="-4" />
                        </div>
                        <div className="col">
                            <label htmlFor="fileItems" className="form-label">Korekta pozioma</label>
                            <input className="form-control" id="BgCorrectionX" defaultValue="5" />
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
