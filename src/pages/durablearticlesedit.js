import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Durablearticlesedit() {

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
    const { durablearticles_Id } = useParams();

    const updateDurablearticles = async (e) => {
        e.preventDefault();
        try {
            await Axios.put(`http://202.44.40.185:3001/updatedurablearticles/${durablearticles_Id}`, {
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

    const getDurablearticlesById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/getdurablearticles/${durablearticles_Id}`);
        console.log(response);
        setDurablearticles_name(response.data[0].durablearticles_name);
        setDurablearticles_brand(response.data[0].durablearticles_brand);
        setDurablearticles_unit(response.data[0].durablearticles_unit);
        setDurablearticles_price(response.data[0].durablearticles_price);
        setDurablearticles_order_date(response.data[0].durablearticles_order_date);
        setDurablearticles_delivery_date(response.data[0].durablearticles_delivery_date);
        setType_durablearticles_Id(response.data[0].type_durablearticles_Id);
        setCompany_Id(response.data[0].company_Id);
        setRoom_Id(response.data[0].room_Id);
        setDurablearticles_status(response.data[0].durablearticles_status);
    };

    useEffect(() => {
        getDurablearticlesById();
    }, []);

    useEffect(() => {
        getCompany();
    }, []);

    //comapny
    const [company, setCompany] = useState([{}]);
    const getCompany = async () => {
        const response = await Axios.get('http://202.44.40.185:3001/getcompany');
        setCompany(response.data);
    };

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
        <div className="Appcontainer">
            <div className="add">
                <form onSubmit={updateDurablearticles}>
                    <br />
                    <div className="field1">
                        <label className="label">เลขครุภัณฑ์ :</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={durablearticles_Id}
                                //onChange={(e) => setDurablearticles_Id(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อครุภัณฑ์ :</label>
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
                    <p>วันที่ซื้อ: {result}</p>

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
                    <p>วันที่รับ: {result2}</p>
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
                                    <option value="78-618">78-618</option>
                                    <option value="78-619">78-619</option>
                                    <option value="78-620">78-620</option>
                                    <option value="ไม่ทราบ">ไม่ทราบ</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">สถานะการยืม:</label>
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
                            อัปเดต
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Durablearticlesedit