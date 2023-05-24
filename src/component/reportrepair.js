import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './reportrepair.css';

function Reportrepair() {

  const [orderm, setOrderm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getOrderm();
  }, []);

  const getOrderm = async () => {
    const response = await Axios.get('http://202.44.40.185:3001/repair2');
    setOrderm(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  return (
    
    <div className="columns mt-5 is-centered">
      
      <div className="column is-half">
        <div className="field">
          <div className="control">
          
            <input
              className="input2"
              type="text"
              placeholder="ค้นหาครุภัณฑ์"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className='report'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ลำดับ</th>
              <th scope="col">เลขครุภัณฑ์</th>
              <th scope="col">ชื่อครุภัณฑ์</th>
              <th scope="col">ห้อง</th>
              <th scope="col">รูป</th>
              <th scope="col">รายละเอียด</th>
              <th scope="col">ชื่อผู้แจ้ง</th>
              <th scope="col">วันที่แจ้ง</th>
              <th scope="col">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {orderm.filter(val => val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((val, index) => (
              <tr key={val.repair_durablearticles_Id}>
                <td>{index + 1}</td>
                <td>{val.durablearticles_Id}</td>
                <td>{val.durablearticles_name}</td>
                <td>{val.room}</td>
                <td>
                  {val.repair_img ? (
                    <img src={`http://202.44.40.185:3001/api/image/${val.repair_img}`} alt={val.durablearticles_name} style={{ width: 50, height: 50 }} />
                  ) : (
                    <p>No image available</p>
                  )}
                </td>
                <td>{val.repair_detail}</td>
                <td>{val.Informer}</td>
                <td>{(val.repair_durablearticles_date == null) ? "" : new Date(val.repair_durablearticles_date).toLocaleDateString('en-GB',{day: 'numeric', month: 'numeric', year: 'numeric'})}</td>
                <td>{val.repair_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};
export default Reportrepair;