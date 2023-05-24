import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Ddetail() {

    const [durablearticles_name, setDurablearticles_name] = useState("");
    const [durablearticles_brand, setDurablearticles_brand] = useState("");
    const [durablearticles_unit, setDurablearticles_unit] = useState("");
    const [durablearticles_price, setDurablearticles_price] = useState("");
    const [durablearticles_order_date, setDurablearticles_order_date] = useState("");
    const [durablearticles_delivery_date, setDurablearticles_delivery_date] = useState("");
    const [type_durablearticles_Id, setType_durablearticles_Id] = useState("");
    const [company_Id, setCompany_Id] = useState("");
    const [type_durablearticles_name, setType_durablearticles_name] = useState("");
    const [company_name, setCompany_name] = useState("");
    const [room_Id, setRoom_Id] = useState("");
    const [durablearticles_status, setDurablearticles_status] = useState("");

    const navigate = useNavigate();
    const { durablearticles_Id } = useParams();

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
        setCompany_name(response.data[0].company_name);
        setType_durablearticles_name(response.data[0].type_durablearticles_name);
        setRoom_Id(response.data[0].room_Id);
        setDurablearticles_status(response.data[0].durablearticles_status);
    };

    useEffect(() => {
        getDurablearticlesById();
    }, []);

    return (
        <div className="Appcontainer">
            <div className="add">
                <form>
                    <br />
                    <div className="field1">
                        <label className="label">เลขครุภัณฑ์ : {durablearticles_Id}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อ : {durablearticles_name}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ยี่ห้อ : {durablearticles_brand}</label>
                    </div>
                    <div className="field1">
                        <label className="label">หน่วยนับ : {durablearticles_unit}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ราคา : {durablearticles_price} บาท</label>
                    </div>
                    <div className="field1">
                        <label className="label" >วันที่ซื้อ : {(durablearticles_order_date == null) ? "" : new Date(durablearticles_order_date).toLocaleDateString('en-GB',{day: 'numeric', month: 'numeric', year: 'numeric'})}</label>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่รับ : {(durablearticles_delivery_date == null) ? "" : new Date(durablearticles_delivery_date).toLocaleDateString('en-GB',{day: 'numeric', month: 'numeric', year: 'numeric'})}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ประเภทครุภัณฑ์ : {type_durablearticles_name}</label>
                    </div>
                    <div className="field1">
                        <label className="label">บริษัท : {company_name}</label>
                    </div>
                    <div className="field1">
                        <label className="label">เลขห้อง : {room_Id}</label>
                    </div>
                    <div className="field1">
                        <label className="label">สถานะการเบิก : {durablearticles_status}</label>
                    </div>

                    <br />
                    <div className="field">
                        <Link to={`/durablearticlesshow`} className="btn btn-primary">กลับ</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Ddetail