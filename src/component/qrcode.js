import './qrcode.css';
import QRCode from 'react-qr-code';
function Qrcode() {
  const path = "367000010012-30406-00001"
  const text=`https://project-kmutnb.vercel.app/repair/`
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
      ctx.fillText(text,200,380)
      
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
    <div className="header">
      <h1>QR Code Generator</h1>
      <div className='QRcode'>
        <QRCode value={text+path} id="QRCode"/>
        <h1 className='imgText'>Product:{path}</h1>
      </div>
      
      
      <div className='download'>
        <input type="button" onClick={download} value="Download"></input>
      </div>
    </div>

  );
}

export default Qrcode;