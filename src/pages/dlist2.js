import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Dlist() {

  const [durablearticles, setDurablearticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roomFilter, setRoomFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const [orderm, setOrderm] = useState([]);

  //durablearticles
  const getDurablearticles = async () => {
    const response = await Axios.get('http://202.44.40.185:3001/durablearticles');
    setDurablearticles(response.data);
  };

  useEffect(() => {
    getDurablearticles();
  }, []);

  //repair
  const getOrderm = async () => {
    const response = await Axios.get('http://202.44.40.185:3001/repair2');
    setOrderm(response.data);
  };

  useEffect(() => {
    getOrderm();
  }, []);

  //search
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const handleRoomFilter = event => {
    setRoomFilter(event.target.value);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = durablearticles.filter(val =>
    (val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase())
      || val.durablearticles_Id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    && val.room_Id.toString().toLowerCase().includes(roomFilter.toLowerCase())
  )

  const sortedItems = sortColumn ? [...filteredItems].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  }) : filteredItems;

  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(durablearticles.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = column => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  }

  return (

    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="ค้นหาครุภัณฑ์"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <select className="select" value={roomFilter} onChange={handleRoomFilter}>
              <option value="">กรุณาเลือกหมายเลขห้อง</option>
              {durablearticles.map(val => val.room_Id)
                .filter((val, index, arr) => arr.indexOf(val) === index)
                .map(val => (
                  <option key={val} value={val}>{val}</option>
                ))
              }
            </select>
          </div>
        </div>

        <table className="table" style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th scope="col" className="col-1">ลำดับ</th>
              <th scope="col" className="col-2" onClick={() => handleSort('durablearticles_Id')}>
                เลขครุภัณฑ์
                {sortColumn === 'durablearticles_Id' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-4" onClick={() => handleSort('durablearticles_name')}>
                ชื่อครุภัณฑ์
                {sortColumn === 'durablearticles_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('durablearticles_unit')}>
                หน่วยนับ
                {sortColumn === 'durablearticles_unit' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1">ยืม</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
              <tr key={val.durablearticles_Id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{val.durablearticles_Id}</td>
                <td>{val.durablearticles_name}</td>
                <td>{val.durablearticles_unit}</td>
                <td>
                  {val.durablearticles_status !== "ยืมไม่ได้" && orderm.filter(order => order.durablearticles_Id === val.durablearticles_Id && order.repair_status === "จำหน่าย").length === 0 ? (
                    <Link to={`/dcart2/${val.durablearticles_Id}`} className="btn btn-success">
                      ยืม
                    </Link>
                  ) : (
                    <button className="btn btn-danger" disabled>
                      ยืม
                    </button>
                  )}
                </td>
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
}

export default Dlist