import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Mshow() {

  const [orderm, setOrderm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    getOrderm();
  }, []);

  const getOrderm = async () => {
    const response = await Axios.get('http://202.44.40.185:3001/repair2');
    setOrderm(response.data.reverse());
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = orderm.filter(val =>
    val.durablearticles_name.toLowerCase().includes(searchTerm.toLowerCase())
    || val.durablearticles_Id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    || (val.repair_durablearticles_date && new Date(val.repair_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).includes(searchTerm))
  );

  const sortedItems = sortColumn ? [...filteredItems].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  }) : filteredItems;

  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orderm.length / itemsPerPage);

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
              placeholder={`ค้นหาครุภัณฑ์`}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <table className="table" style={{ tableLayout: "fixed", width: "95%", margin: "0 auto" }}>
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
              <th scope="col" className="col-1" onClick={() => handleSort('room')}>
                ห้อง
                {sortColumn === 'room' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1">รูป</th>
              <th scope="col" className="col-1" onClick={() => handleSort('repair_detail')}>
                รายละเอียด
                {sortColumn === 'repair_detail' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('Informer')}>
                ชื่อผู้แจ้ง
                {sortColumn === 'Informer' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('repair_durablearticles_date')}>
                วันที่แจ้ง
                {sortColumn === 'repair_durablearticles_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1">จัดการ</th>
              <th scope="col" className="col-1" onClick={() => handleSort('repair_status')}>
                สถานะ
                {sortColumn === 'repair_status' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
              <tr key={val.repair_durablearticles_Id}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                <td>{val.durablearticles_Id}</td>
                <td>{val.durablearticles_name}</td>
                <td>{val.room}</td>
                <td><img src={`http://202.44.40.185:3001/api/image/${val.repair_img}`} alt={val.durablearticles_name} style={{ width: 50, height: 50 }} /></td>
                <td>{val.repair_detail}</td>
                <td>{val.Informer}</td>
                <td>{(val.repair_durablearticles_date == null) ? "" : new Date(val.repair_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                <td>
                  {val.repair_status === "รอดำเนินการ" ? (
                    <Link to={`/repair2/${val.repair_durablearticles_Id}`} className="btn btn-success">
                      จัดการ
                    </Link>
                  ) : (
                    <button className="btn btn-danger" disabled>
                      จัดการ
                    </button>
                  )}
                </td>
                <td>{val.repair_status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav style={{ tableLayout: "fixed", width: "95%", margin: "0 auto" }}>
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

export default Mshow