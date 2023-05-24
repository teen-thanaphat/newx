import Axios from 'axios'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';

function Durablearticlesadd() {

    const [CSVData, setCSVData] = useState("");

    const [durablearticles_Id, setDurablearticles_Id] = useState("");
    const [durablearticles_name, setDurablearticles_name] = useState("");
    const [durablearticles_brand, setDurablearticles_brand] = useState("");
    const [durablearticles_unit, setDurablearticles_unit] = useState("");
    const [durablearticles_price, setDurablearticles_price] = useState("");
    const [durablearticles_order_date, setDurablearticles_order_date] = useState("");
    const [durablearticles_delivery_date, setDurablearticles_delivery_date] = useState("");
    const [type_durablearticles_Id, setType_durablearticles_Id] = useState("");
    const [company_Id, setCompany_Id] = useState("");
    const [room_Id, setRoom_Id] = useState("");
    const [durablearticles_status, setDurablearticles_status] = useState("");

    const navigate = useNavigate();

    const saveDurablearticles = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: 'Add Success!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
              });
            await Axios.post('http://202.44.40.185:3001/createdurablearticles', {
                durablearticles_Id,
                durablearticles_name,
                durablearticles_brand,
                durablearticles_unit,
                durablearticles_price,
                durablearticles_order_date,
                durablearticles_delivery_date,
                type_durablearticles_Id,
                company_Id,
                room_Id,
                durablearticles_status,
            });
            navigate("/durablearticlesshow");
        } catch (error) {
            console.log(error);
        }
    };

    //csv
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const rows = text.split("\n").map((row) => row.split(","));
            console.log(rows);
            console.log(rows.length);
            const formattedRows = rows.map((row, rowIndex) => {
                if (rowIndex === 0) return row; // ใช้ header row เดิม
                return row.map((cell, cellIndex) => {
                    if (cellIndex >= 5 && cellIndex <= 9) {
                        const dateParts = cell.split("/");
                        if (dateParts.length === 3) {
                            const day = dateParts[0].padStart(2, "0");
                            const month = dateParts[1].padStart(2, "0");
                            const year = dateParts[2];
                            return `${year}-${month}-${day}`;
                        }
                    }
                    return cell;
                });
            });
            console.log(formattedRows);
            setCSVData(formattedRows);
        };
        reader.readAsText(file);
    };


    const handleFileUpload = () => {
        for (let i = 1; i < CSVData.length; i++) {
            const [
                durablearticles_Id,
                durablearticles_name,
                durablearticles_brand,
                durablearticles_unit,
                durablearticles_price,
                durablearticles_order_date,
                durablearticles_delivery_date,
                type_durablearticles_Id,
                company_Id,
                room_Id,
                durablearticles_status,
            ] = CSVData[i];
            Axios.post('http://202.44.40.185:3001/createdurablearticles', {
                durablearticles_Id,
                durablearticles_name,
                durablearticles_brand,
                durablearticles_unit,
                durablearticles_price,
                durablearticles_order_date,
                durablearticles_delivery_date,
                type_durablearticles_Id,
                company_Id,
                room_Id,
                durablearticles_status,
            }).then(() => {
                navigate("/durablearticlesshow");
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    //comapny
    const [company, setCompany] = useState([{}]);
    const getCompany = async () => {
        const response = await Axios.get('http://202.44.40.185:3001/getcompany');
        setCompany(response.data);
    };

    useEffect(() => {
        getCompany();
    }, []);

    const date = new Date(durablearticles_order_date);
    //const formattedDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    const date2 = new Date(durablearticles_delivery_date);
    //const formattedDate2 = date2.getDate() + '/' + (date2.getMonth() + 1) + '/' + date2.getFullYear();

    const result = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    
      const result2 = date2.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })


    return (
        <div className="App container">
            <div className="add">
                <form onSubmit={saveDurablearticles}>
                    <br />
                    <div className="field1">
                        <label className="label">เลขครุภัณฑ์ :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={durablearticles_Id}
                                onChange={(e) => setDurablearticles_Id(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อ :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={durablearticles_name}
                                onChange={(e) => setDurablearticles_name(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ยี่ห้อ :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={durablearticles_brand}
                                onChange={(e) => setDurablearticles_brand(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">หน่วยนับ :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                pattern="[ก-๙a-zA-Z\s]*"
                                value={durablearticles_unit}
                                onChange={(e) => setDurablearticles_unit(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ราคา :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                pattern="[0-9]*(\.[0-9]{0,2})?"
                                min="0"
                                value={durablearticles_price}
                                onChange={(e) => setDurablearticles_price(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่ซื้อ :</label>
                        <div className="control">
                            <input
                                type="date"
                                className="input"
                                value={result}
                                onChange={(e) => setDurablearticles_order_date(e.target.value)}
                            />
                        </div>
                    </div>
                    <p>วันที่ซื้อ : {result}</p>

                    <div className="field1">
                        <label className="label">วันที่รับ :</label>
                        <div className="control">
                            <input
                                type="date"
                                className="input"
                                min={(durablearticles_order_date !== "") ? durablearticles_order_date : durablearticles_delivery_date}
                                value={result2}
                                onChange={(e) => setDurablearticles_delivery_date(e.target.value)}
                            />
                        </div>
                    </div>
                    <p>วันที่รับ : {result2}</p>
                    <div className="field1">
                        <label className="label">ประเภทครุภัณฑ์ :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={type_durablearticles_Id}
                                    onChange={(e) => setType_durablearticles_Id(e.target.value)}
                                >
                                    <option value="">-- เลือกประเภทของครุภัณฑ์ --</option>
                                    <option value="12060100">ครุภัณฑ์สำนักงาน</option>
                                    <option value="12060300">ครุภัณฑ์ไฟฟ้าและวิทยุ</option>
                                    <option value="12060400">ครุภัณฑ์โฆษณาและเผยแพร่</option>
                                    <option value="12060800">ครุภัณฑ์สำรวจ</option>
                                    <option value="12061000">ครุภัณฑ์คอมพิวเตอร์</option>
                                    <option value="12061100">ครุภัณฑ์การศึกษา</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">บริษัท :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={company_Id}
                                    onChange={(e) => setCompany_Id(e.target.value)}
                                >
                                    <option value="">-- เลือกบริษัท --</option>
                                    {company.map(item => (
                                        <option key={item.company_Id} value={item.company_Id}>{item.company_name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">เลขห้อง :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={room_Id}
                                    onChange={(e) => setRoom_Id(e.target.value)}
                                >
                                    <option value="">-- เลือกห้อง --</option>
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
                                    <option value="ไม่ทราบ">ไม่ทราบ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">สถานะการเบิก :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={durablearticles_status}
                                    onChange={(e) => setDurablearticles_status(e.target.value)}
                                >
                                    <option value="">-- เลือกสถานะการยืม --</option>
                                    <option value="ยืมได้">ยืมได้</option>
                                    <option value="ยืมไม่ได้">ยืมไม่ได้</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-primary">
                            เพิ่ม
                        </button>
                    </div>
                </form>
            </div><br />

            <div className="field1">
                <label className="label" >อัพโหลด CSV:</label>
                <div className="control">
                    <input type="file" onChange={handleFileInputChange} />
                    <button class="btn btn-success" onClick={handleFileUpload}>เพิ่ม</button>
                </div>
            </div>
        </div>
    );
}

export default Durablearticlesadd