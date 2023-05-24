import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function Mdetail() {

    const [material_name, setMaterial_name] = useState("");
    const [material_brand, setMaterial_brand] = useState("");
    const [material_unit, setMaterial_unit] = useState("");
    const [material_price, setMaterial_price] = useState("");
    const [material_remaining, setMaterial_remaining] = useState("");
    const [material_order_date, setMaterial_order_date] = useState("");
    const [material_delivery_date, setMaterial_delivery_date] = useState("");
    const [type_material_Id, setType_material_Id] = useState("");
    const [company_Id, setCompany_Id] = useState("");
    const [type_material_name, setType_material_name] = useState("");
    const [company_name, setCompany_name] = useState("");
    const [material_status, setMaterial_status] = useState("");

    const navigate = useNavigate();
    const { material_Id } = useParams();

    const getMaterialById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/getmaterial/${material_Id}`);
        console.log(response);
        setMaterial_name(response.data[0].material_name);
        setMaterial_brand(response.data[0].material_brand);
        setMaterial_unit(response.data[0].material_unit);
        setMaterial_price(response.data[0].material_price);
        setMaterial_remaining(response.data[0].material_remaining);
        setMaterial_order_date(response.data[0].material_order_date);
        setMaterial_delivery_date(response.data[0].material_delivery_date);
        setType_material_Id(response.data[0].type_material_Id);
        setCompany_Id(response.data[0].company_Id);
        setType_material_name(response.data[0].type_material_name);
        setCompany_name(response.data[0].company_name);
        setMaterial_status(response.data[0].material_status);
    };

    useEffect(() => {
        getMaterialById();
    }, []);

    return (
        <div className="Appcontainer">
            <div className="add">
                <form>
                    <br />
                    <div className="field1">
                        <label className="label">เลขวัสดุ : {material_Id}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อวัสดุ : {material_name}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ยี่ห้อ : {material_brand}</label>
                    </div>
                    <div className="field1">
                        <label className="label">หน่วยนับ : {material_unit}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ราคา : {material_price} บาท</label>
                    </div>
                    <div className="field1">
                        <label className="label">คงเหลือ : {material_remaining}</label>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่ซื้อ : {(material_order_date == null) ? "" : new Date(material_order_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</label>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่รับ : {(material_delivery_date == null) ? "" : new Date(material_delivery_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric' })}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ประเภทวัสดุ : {type_material_name}</label>
                    </div>
                    <div className="field1">
                        <label className="label">บริษัท : {company_name}</label>
                    </div>
                    <div className="field1">
                        <label className="label">สถานะ : {material_status ? material_status : "ยังไม่จำหน่าย"}</label>
                    </div>

                    <br />
                    <div className="field">
                        <Link to={`/materialshow`} className="btn btn-primary">กลับ</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Mdetail