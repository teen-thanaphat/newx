import Axios from 'axios'
import React from "react";
import { useState, useEffect } from "react";

function Materialshow() {

    //แจ้งเตือนเบิกวัสดุ
    const [orderm2, setOrderm2] = useState([]);
    const ordermFiltered2 = orderm2.filter((val) => val.order_material_status === null);

    useEffect(() => {
        getOrderm2();
    }, []);

    const getOrderm2 = async () => {
        const response = await Axios.get('http://202.44.40.185:3001/order_material3');
        setOrderm2(response.data.reverse()); // Reverse orderm array
    };

    const [showWarning4, setShowWarning4] = useState(true);
    const handleButtonClick4 = () => {
        setShowWarning4(!showWarning4);
    };

    //แจ้งเตือนยืมครุภัณฑ์
    const [orderd, setOrderd] = useState([]);
    const orderdFiltered = orderd.filter((val) => val.order_durablearticles_status === null);

    useEffect(() => {
        getOrderd();
    }, []);

    const getOrderd = async () => {
        const response = await Axios.get('http://202.44.40.185:3001/order_durablearticles3');
        setOrderd(response.data.reverse()); // Reverse orderd array
    };

    const [showWarning3, setShowWarning3] = useState(true);
    const handleButtonClick3 = () => {
        setShowWarning3(!showWarning3);
    };

    //แจ้งซ่อม
    const [orderm, setOrderm] = useState([]);
    const ordermFiltered = orderm.filter((val) => val.repair_status === "รอดำเนินการ");

    useEffect(() => {
        getOrderm();
    }, []);

    const getOrderm = async () => {
        const response = await Axios.get('http://202.44.40.185:3001/repair2');
        setOrderm(response.data.reverse()); // Reverse orderd array
    };

    const [showWarning2, setShowWarning2] = useState(true);
    const handleButtonClick2 = () => {
        setShowWarning2(!showWarning2);
    };

    //วัสดุใกล้หมด
    const [material, setMaterial] = useState([]);

    useEffect(() => {
        getMaterial();
    }, []);

    const getMaterial = async () => {
        const response = await Axios.get('http://202.44.40.185:3001/material');
        const materials = response.data.filter(material => material.material_remaining < 5);
        setMaterial(materials);
    };

    const [showWarning, setShowWarning] = useState(true);
    const handleButtonClick = () => {
        setShowWarning(!showWarning);
    };

    return (
        <div style={{ paddingTop: "15px" }}>

            <div>
                <button onClick={handleButtonClick4} class="btn btn-info" style={{ color: "black" }}> "กดเพื่อซ่อนและแสดง"</button>
                {showWarning4 && (
                    <div style={{ backgroundColor: "#CCCCFF", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                        <h3 style={{ color: "blue" }}>รายการเบิกวัสดุ <span role="img" aria-label="warning">⚠️</span> </h3>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <table className='warn2' style={{ borderCollapse: "collapse", width: "90%", margin: "0 auto", marginTop: "10px" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#9999FF" }}>
                                        <th scope="col">เลขวัสดุ</th>
                                        <th scope="col">ชื่อวัสดุ</th>
                                        <th scope="col">วันที่</th>
                                        <th scope="col">ชื่อผู้เบิก</th>
                                        <th scope="col">จัดการใบเบิก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ordermFiltered2.map((val, index) => (
                                        <tr key={val.order_material_Id}>
                                            <td style={{ border: "1px solid black" }}>{val.material_Id}</td>
                                            <td style={{ border: "1px solid black" }}>{val.material_name}</td>
                                            <td style={{ border: "1px solid black" }}>{(val.order_material_date == null) ? "" : new Date(val.order_material_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                            <td style={{ border: "1px solid black" }}>{val.username}</td>
                                            <td style={{ border: "1px solid black" }}><a href='/mshow'>click!</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div><br />

            <div>
                <button onClick={handleButtonClick3} class="btn btn-warning" style={{ color: "black" }}> "กดเพื่อซ่อนและแสดง"</button>
                {showWarning3 && (
                    <div style={{ backgroundColor: "#FFE5CC", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                        <h3 style={{ color: "orange" }}>รายการยืมครุภัณฑ์ <span role="img" aria-label="warning">⚠️</span></h3>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <table className='warn2' style={{ borderCollapse: "collapse", width: "90%", margin: "0 auto", marginTop: "10px" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#FFB266" }}>
                                        <th scope="col">เลขครุภัณฑ์</th>
                                        <th scope="col">ชื่อครุภัณฑ์</th>
                                        <th scope="col">วันที่</th>
                                        <th scope="col">ชื่อผู้ยืม</th>
                                        <th scope="col">จัดการใบเบิก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderdFiltered.map((val, index) => (
                                        <tr key={val.order_durablearticles_Id}>
                                            <td style={{ border: "1px solid black" }}>{val.durablearticles_Id}</td>
                                            <td style={{ border: "1px solid black" }}>{val.durablearticles_name}</td>
                                            <td style={{ border: "1px solid black" }}>{(val.order_durablearticles_date == null) ? "" : new Date(val.order_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                            <td style={{ border: "1px solid black" }}>{val.username}</td>
                                            <td style={{ border: "1px solid black" }}><a href='/dshow'>click!</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div><br />

            <div>
                <button onClick={handleButtonClick2} class="btn btn-success" style={{ color: "black" }}> "กดเพื่อซ่อนและแสดง"</button>
                {showWarning2 && (
                    <div style={{ backgroundColor: "#E5FFCC", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                        <h3 style={{ color: "green" }}>รายการแจ้งซ่อมครุภัณฑ์ <span role="img" aria-label="warning">⚠️</span> </h3>
                        <div style={{ display: "flex", justifyContent: "center" }}></div>
                        <table className='warn2' style={{ borderCollapse: "collapse", width: "90%", margin: "0 auto", marginTop: "10px" }}>
                            <thead>
                                <tr style={{ backgroundColor: "#B2FF66" }}>
                                    <th scope="col">เลขครุภัณฑ์</th>
                                    <th scope="col">ชื่อครุภัณฑ์</th>
                                    <th scope="col">วันที่แจ้ง</th>
                                    <th scope="col">ชื่อผู้แจ้ง</th>
                                    <th scope="col">จัดการแจ้งซ่อม</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordermFiltered.map((val, index) => (
                                    <tr key={val.repair_durablearticles_Id}>
                                        <td style={{ border: "1px solid black" }}>{val.durablearticles_Id}</td>
                                        <td style={{ border: "1px solid black" }}>{val.durablearticles_name}</td>
                                        <td style={{ border: "1px solid black" }}>{(val.repair_durablearticles_date == null) ? "" : new Date(val.repair_durablearticles_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</td>
                                        <td style={{ border: "1px solid black" }}>{val.Informer}</td>
                                        <td style={{ border: "1px solid black" }}><a href='/repair'>click!</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div><br />

            <div>
                <button onClick={handleButtonClick} class="btn btn-danger" style={{ color: "black" }}> "กดเพื่อซ่อนและแสดง"</button>
                {showWarning && (
                    <div style={{ backgroundColor: "#f8d7da", padding: "20px", borderRadius: "5px", textAlign: "center" }}>
                        <h3 style={{ color: "red" }}>วัสดุที่เหลือน้อย <span role="img" aria-label="warning">⚠️</span></h3>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <table className='warn2' style={{ borderCollapse: "collapse", width: "90%", margin: "0 auto", marginTop: "10px" }}>
                                <thead>
                                    <tr style={{ backgroundColor: "#f5c6cb" }}>
                                        <th>เลขวัสดุ</th>
                                        <th>ชื่อ</th>
                                        <th>คงเหลือ</th>
                                        <th>หน่วยนับ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {material.map((val, index) => (
                                        // ตรวจสอบค่า material_status ว่าเป็น "จำหน่าย" หรือไม่
                                        val.material_status !== "จำหน่าย" &&
                                        <tr key={val.material_Id}>
                                            <td style={{ border: "1px solid black" }}>{val.material_Id}</td>
                                            <td style={{ border: "1px solid black" }}>{val.material_name}</td>
                                            <td style={{ border: "1px solid black" }}>{val.material_remaining}</td>
                                            <td style={{ border: "1px solid black" }}>{val.material_unit}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                )}
            </div><br />

        </div>
    );
};

export default Materialshow