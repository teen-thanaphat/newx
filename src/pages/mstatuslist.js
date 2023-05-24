import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './materialshow.css';

function Materialshow() {

  const [material, setMaterial] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    getMaterial();
  }, []);

  const getMaterial = async () => {
    const response = await Axios.get('http://202.44.40.185:3001/material_njn');
    setMaterial(response.data);
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  //page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //search
  const currentItems = material.filter(val =>
    val.material_name.toLowerCase().includes(searchTerm.toLowerCase())
    || val.material_Id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(material.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="columns mt-3 is-centered" >
      <div className="column is-half">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="ค้นหาวัสดุ"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          </div><h4 style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>วัสดุที่ยังไม่จำหน่าย</h4><br></br>

        <table className="table" style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th scope="col" className="col-1">ลำดับ</th>
              <th scope="col" className="col-2">เลขวัสดุ</th>
              <th scope="col" className="col-4">ชื่อ</th>
              <th scope="col" className="col-1">ราคา</th>
              <th scope="col" className="col-1">คงเหลือ</th>
              <th scope="col" className="col-1">หน่วยนับ</th>
              <th scope="col" className="col-1">สถานะ</th>
              <th scope="col" className="col-2">จัดการสถานะ</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
              <tr key={val.material_Id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td scope="row">{val.material_Id}</td>
                <td>{val.material_name}</td>
                <td>{val.material_price}</td>
                <td>{val.material_remaining}</td>
                <td>{val.material_unit}</td>
                <td>{val.material_status ? val.material_status : "ยังไม่จำหน่าย"}</td>
                <td><Link to={`/mstatus/${val.material_Id}`} className="btn btn-danger">จัดการ</Link></td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button onClick={() => paginate(1)} className="page-link">หน้าแรก</button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage - 1)} className="page-link">ก่อนหน้า</button>
            </li>
            {[...Array(totalPages)].map((_, index) => {
              if (index + 1 === currentPage) {
                return (
                  <li key={index} className="page-item active">
                    <button className="page-link">{index + 1}</button>
                  </li>
                );
              } else if (
                index + 1 >= currentPage - 9 &&
                index + 1 <= currentPage + 9 &&
                index + 1 !== totalPages
              ) {
                return (
                  <li key={index} className="page-item">
                    <button onClick={() => paginate(index + 1)} className="page-link">{index + 1}</button>
                  </li>
                );
              } else if (index + 1 === currentPage - 10 || index + 1 === currentPage + 10) {
                return (
                  <li key={index} className="page-item disabled">
                    <button className="page-link">...</button>
                  </li>
                );
              } else if (index + 1 === totalPages) {
                return (
                  <li key={index} className="page-item">
                    <button onClick={() => paginate(totalPages)} className="page-link">{totalPages}</button>
                  </li>
                );
              }
              return null;
            })}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button onClick={() => paginate(currentPage + 1)} className="page-link">ถัดไป</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Materialshow;