import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Durablearticlesshow() {

    const [durablearticles, setDurablearticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        getDurablearticles();
    }, []);

    const getDurablearticles = async () => {
        const response = await Axios.get('http://202.44.40.185:3001/durablearticles_jn');
        setDurablearticles(response.data);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
    }
    //page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //search
    const filteredItems = durablearticles.filter(val =>
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
        <div className="columns mt-3 is-centered">
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
                            <th scope="col" className="col-1" onClick={() => handleSort('durablearticles_unit')}>
                                หน่วยนับ
                                {sortColumn === 'durablearticles_unit' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th scope="col" className="col-1" onClick={() => handleSort('durablearticles_price')}>
                                ราคา
                                {sortColumn === 'durablearticles_price' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th scope="col" className="col-1" onClick={() => handleSort('room_Id')}>
                                เลขห้อง
                                {sortColumn === 'room_Id' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th scope="col" className="col-1" onClick={() => handleSort('durablearticles_status')}>
                                สถานะ
                                {sortColumn === 'durablearticles_status' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((val, index) => (
                            <tr key={val.durablearticles_Id}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td scope="row">{val.durablearticles_Id}</td>
                                <td>{val.durablearticles_name}</td>
                                <td>{val.durablearticles_unit}</td>
                                <td>{val.durablearticles_price}</td>
                                <td>{val.room_Id}</td>
                                <td>{val.repair_status}</td>
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

export default Durablearticlesshow