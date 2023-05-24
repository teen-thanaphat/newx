import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Dshow() {

  const [orderd, setOrderd] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    getOrderd();
  }, []);

  const getOrderd = async () => {
    const response = await Axios.get('http://202.44.40.185:3001/order_durablearticles3');
    setOrderd(response.data.reverse()); // Reverse orderd array
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = orderd.filter(val =>
    val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase())
    || val.durablearticles_Id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = sortColumn ? [...filteredItems].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  }) : filteredItems;

  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orderd.length / itemsPerPage);

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
              <th scope="col" className="col-2" onClick={() => handleSort('order_durablearticles_location')}>
                ยืมไปใช้ที่ไหน
                {sortColumn === 'order_durablearticles_location' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('order_durablearticles_date')}>
                วันที่
                {sortColumn === 'order_durablearticles_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('username')}>
                ชื่อผู้ยืม
                {sortColumn === 'username' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1">จัดการ</th>
              <th scope="col" className="col-1" onClick={() => handleSort('order_durablearticles_status')}>
                สถานะ
                {sortColumn === 'order_durablearticles_status' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
              <tr key={val.order_durablearticles_Id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{val.durablearticles_Id}</td>
                <td>{val.durablearticles_name}</td>
                <td>{val.order_durablearticles_location}</td>
                <td>{(val.order_durablearticles_date == null) ? "" : new Date(val.order_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                <td>{val.username}</td>
                <td>{val.order_durablearticles_status === null ?
                  <Link to={`/dshow2/${val.order_durablearticles_Id}`} className="btn btn-success">จัดการ</Link>
                  : (
                    <button class="btn btn-danger" disabled>จัดการ</button>
                  )}</td>
                <td>{val.order_durablearticles_status ? val.order_durablearticles_status : "รอดำเนินการ"}</td>
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
    </div >
  );
};




export default Dshow