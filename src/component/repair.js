import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Swal from 'sweetalert2';
import './repair.css';

export default function Repair() {
  const [material, setMaterial] = useState([]);
  const storageRepairType = sessionStorage.getItem("repairType");
  const durablearticles_Id = storageRepairType;
  const [room, setRoom] = useState("");
  const [description, setDescription] = useState("");
  const [informer, setInformer] = useState("");
  const [du_name, setDurablearticlesName] = useState("");
  const [typeId, setTypeDurablearticlesId] = useState("");
  const repair_durablearticles_Id = "";
  const [showFileInput, setShowFileInput] = useState(true);
  const [dataUri, setDataUri] = useState(null);
  const [camera, setCamera] = useState(null);
  const fileInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [typename, setTypename] = useState("");



  useEffect(() => {
    async function getMaterial() {
      try {
        const response = await axios.get("http://202.44.40.185:3001/durablearticles");
        const jsonData = response.data;
        setMaterial(jsonData);
        const foundData = jsonData.find((data) => data.durablearticles_Id === durablearticles_Id);
        if (foundData) {
          setDurablearticlesName(foundData.durablearticles_name);
          setTypeDurablearticlesId(foundData.type_durablearticles_Id);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getMaterial();
    
  }, [durablearticles_Id]);
  useEffect(() => {
  async function gettype() {
    try {
      const response = await axios.get("http://202.44.40.185:3001/type_durablearticles");
      const jsonData = response.data;
      const foundtype = jsonData.find((data) => data.type_durablearticles_Id === typeId);
      if (foundtype) {
        setTypename(foundtype.type_durablearticles_name);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  gettype()
})
  function dataURItoFile(dataURI, fileName) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const file = new Blob([ab], { type: mimeString });
    file.lastModifiedDate = new Date();
    file.name = fileName;
    return file;
  }
  async function handle(event) {
    event.preventDefault();
  }
  async function handleSubmit(event) {
    event.preventDefault();

    if (!informer) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill in the informer field',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    if (!dataUri) {
      Swal.fire({
        icon: 'warning',
        title: 'Please take a photo',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }
    if (!room) {
      Swal.fire({
        icon: 'warning',
        title: 'Please set room',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const data = {
      repair_durablearticles_Id,
      du_name,
      durablearticles_Id,
      room,
      description,
      Informer: informer,
      repair_detail: description,
      typename,
    };

    const file = dataURItoFile(dataUri, 'photo.jpg');

    const formData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('data', JSON.stringify(data));

    try {
      const response = await axios.post('http://202.44.40.185:3001/upload', formData);
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
        timer: 2000,
        showConfirmButton: false
      });
    }
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "room") {
      setRoom(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "Informer") {
      setInformer(value);
    }
  }

  async function handleCamera() {
    //try {
      //const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      //setStream(stream);
      //if (dataUri) {
        //setDataUri("");
        //setShowFileInput(true);
      //} else {
       // setCamera(true);
       // setShowFileInput(false);
     // }
    //} catch (err) {
      //console.error('Failed to access camera: ', err);
      //alert('Failed to access camera. Please check your camera settings permission and try again.');
   //}

  }
  
  function handleTakePhoto(dataUri) {
    setDataUri(dataUri);
    setCamera(false);
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDataUri(reader.result);
    };
  }
  const handleRetake = () => {
    setDataUri("");
    setShowFileInput(true);
    fileInputRef.current.value = "";
  };
  
  return (
    <div>
      <br></br>
      <h2 className="topic">แจ้งซ่อมครุภัณฑ์</h2>
      <form onSubmit={handle}>
        <label>ID:{durablearticles_Id}  </label>
        <label>ชื่อ:{du_name} </label>
        <label>ประเภท:{typename} </label>
        <label>ห้อง:</label>
        <select name="room" value={room} onChange={handleInputChange}>
          <option value="select">select</option>
          <option value="78-601">78-601</option>
                <option value="78-602">78-602</option>
                <option value="78-603">78-603</option>
                <option value="78-604">78-604</option>
                <option value="78-605">78-605</option>
                <option value="78-606">78-606</option>
                <option value="78-607">78-607</option>
                <option value="78-608">78-608</option>
                <option value="78-609">78-609</option>
                <option value="78-610">78-610</option>
                <option value="78-611">78-611</option>
                <option value="78-612">78-612</option>
                <option value="78-613">78-613</option>
                <option value="78-614">78-614</option>
                <option value="78-615">78-615</option>
                <option value="78-616">78-616</option>
                <option value="78-617">78-617</option>
                <option value="78-618/1">78-618/1</option>
                <option value="78-618/2">78-618/2</option>
                <option value="78-619">78-619</option>
                <option value="78-620">78-620</option>
        </select>
        {dataUri && <img src={dataUri} alt="captured" />}
        <button className="camera" onClick={dataUri ? handleRetake : handleCamera}>
        {dataUri ? "Retake" : "Camera"}
        </button>
        {showFileInput && (
        <div>
          <input type="file" name="image" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
        </div>
      )}


  
        {camera && (
          <Camera
            onTakePhoto={handleTakePhoto}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            idealResolution={{ width: 200, height: 200 }}
            imageType={IMAGE_TYPES.JPG}
            imageCompression={0.97}
          />
        )}
  
        <label>รายละเอียดเพิ่มเติม:</label>
        <textarea
          onChange={handleInputChange}
          value={description}
          name="description"
        ></textarea>
        <br></br>
        <label>ผู้แจ้ง:</label>
        <input
          type="text"
          value={informer}
          onChange={handleInputChange}
          name="Informer"
        />
        <br></br>
        <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
      </form>
      
    </div>
  )
  
  
}