import './qrcode.css';
import QRCode from 'react-qr-code';
function Qrcode() {
  const path = window.location.pathname.match(/\d+(-\d+)*/)[0];
  const text=`http://202.44.40.185/repairS/`
  //download qr code
  const download=()=>{
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas");
    const Node =document.getElementById("imgText")
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      ctx.fillStyle="white"
      ctx.fillRect(0,0,400,400)
      ctx.drawImage(img,75,70);
      ctx.fillStyle="Black"
      ctx.textAlign="center"
      ctx.fillStyle="black"
      ctx.font="bold 24px sans-serif"
      ctx.fillText(path,200,380)
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");

      //name img
      downloadLink.download = `${path}.png`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    img.alt = "Freedom Blog"
  }

  return (
    <div className="header"><br></br>
      <h1>QR Code Generator</h1><br></br>
      <div className='QRcode'>
        <QRCode value={text+path} id="QRCode"/><br></br><br></br>
        <h1 className='imgText'>Product:{path}</h1><br></br>
      </div>
      
      
      <div className='download'>
        <input type="button" onClick={download} value="Download"></input>
      </div>
    </div>

  );
}

export default Qrcode;