import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

export default function Repair() {
  const storageRepairType = sessionStorage.getItem('repairType');
  const durablearticles_Id=storageRepairType

  const [material, setMaterial] = useState([]);
  const [notifier, setNotifier] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getMaterial();
  }, []);

  const getMaterial = async () => {
    try {
      const response = await axios.get('http://202.44.40.185:3001/durablearticles');
      setMaterial(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const WebcamCapture = () => {
    const [image, setImage] = useState(null);
    const webcamRef = useRef(null);

    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      webcamRef.current.stream.getTracks().forEach((track) => track.stop());
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      // Submit form data
      const formData = new FormData();
      formData.append('durablearticles_Id', durablearticles_Id);
      formData.append('repair_img', image);
      formData.append('notifier', notifier);
      formData.append('description', description);
      axios.post(`http://202.44.40.185:3001/repair/${durablearticles_Id}`, formData)
        .then((response) => {
          console.log(response);
          alert('Submit success!');
        })
        .catch((error) => {
          console.error(error);
          alert('Submit failed!');
        });
    };

    return (
      <div>
        <h2>แจ้งซ่อมครุภัณฑ์</h2>
        <form onSubmit={handleSubmit}>
          {material.map((val, index) => (
            val.durablearticles_Id === storageRepairType && (
              <div key={index}>
                <label>ID: {val.durablearticles_Id}</label><br />
                <label>ชื่อ: {val.durablearticles_name}</label><br />
                <label>ประเภท: {val.type_durablearticles_Id}</label><br />
                <label>ห้อง:</label>
                <select name="room">
                  <option value={val.room_Id}>{val.room_Id}</option>
                  <option value="78-601">78-601</option>
                </select>
              </div>
            )
          ))}

          <br />
          <label>รูปภาพ:</label>
          {image ? (
            <img src={image} alt="capture" />
          ) : (
            <>
              <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={210} height={120} />
              <button onClick={capture}>ถ่ายรูป</button>
            </>
          )}
          <br />
          <label>รายละเอียดเพิ่มเติม:</label>
          <input type="text" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
          <br />
          <label>ผู้แจ้ง:</label>
          <input type="text" name="notifier" value={notifier} onChange={(event) => setNotifier(event.target.value)} /><br />
          <br />
          <button type="submit" className="submit">Submit</button>
        </form>
      </div>
    );
  };

  return <WebcamCapture />;


}
