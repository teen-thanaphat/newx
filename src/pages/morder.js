import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";

function Mshow() {

  const [orderm, setOrderm] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("material_name"); // Default search criteria is material_name
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    getOrderm();
  }, []);

  const getOrderm = async () => {
    const response = await Axios.get('http://202.44.40.185:3001/order_material2');
    setOrderm(response.data.reverse()); // Reverse
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  }

  const handleSearchCriteria = event => {
    setSearchCriteria(event.target.value);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredItems = orderm.filter(val =>
    val[searchCriteria].toLowerCase().includes(searchTerm.toLowerCase())
    || (val.order_material_date && new Date(val.order_material_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' }).includes(searchTerm))
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
            <div className="select">
              <select value={searchCriteria} onChange={handleSearchCriteria}>
                <option value="material_name">ชื่อวัสดุ</option>
                <option value="material_Id">เลขวัสดุ</option>
                <option value="username">ชื่อผู้เบิก</option>
                <option value="order_material_date">วันที่</option>
              </select>
            </div>
            <input
              className="input"
              type="text"
              placeholder={`ค้นหา`}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <CSVLink
              data={orderm}
              filename={"order_material.csv"}
              className="button is-link "
              class="btn btn-success"
              target="_blank"
            >
              ดาวน์โหลดเป็นไฟล์ Excel
            </CSVLink>
          </div>
        </div>

        <table className="table" style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
          <thead>
            <tr>
              <th scope="col" className="col-1">ลำดับ</th>
              <th scope="col" className="col-2" onClick={() => handleSort('material_Id')}>
                เลขวัสดุ
                {sortColumn === 'material_Id' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-4" onClick={() => handleSort('material_name')}>
                ชื่อ
                {sortColumn === 'material_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('order_material_quantity')}>
                จำนวนที่เบิก
                {sortColumn === 'order_material_quantity' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('order_material_date')}>
                วันที่
                {sortColumn === 'order_material_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('username')}>
                ชื่อผู้เบิก
                {sortColumn === 'username' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
              <th scope="col" className="col-1" onClick={() => handleSort('order_material_status')}>
                สถานะ
                {sortColumn === 'order_material_status' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val, index) => (
                <tr key={val.order_material_Id}>
                  <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                  <td>{val.material_Id}</td>
                  <td>{val.material_name}</td>
                  <td>{val.order_material_quantity}</td>
                  <td>{(val.order_material_date == null) ? "" : new Date(val.order_material_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                  <td>{val.username}</td>
                  <td>{val.order_material_status ? val.order_material_status : "รอดำเนินการ"}</td>
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
export default Mshow