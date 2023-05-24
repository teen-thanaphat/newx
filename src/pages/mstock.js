import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

function Mstock() {

    const [stock_material_Id, setStock_material_Id] = useState("");
    const [stock_material_add, setStock_material_add] = useState("");
    const [stock_material_date, setStock_material_date] = useState(new Date().toISOString().slice(0, 10));
    const displayname = sessionStorage.getItem('displayname');
    const username = displayname;

    const [material_name, setMaterial_name] = useState("");
    const [material_brand, setMaterial_brand] = useState("");
    const [material_unit, setMaterial_unit] = useState("");
    const [material_price, setMaterial_price] = useState("");
    const [material_remaining, setMaterial_remaining] = useState("");
    const [material_order_date, setMaterial_order_date] = useState("");
    const [material_delivery_date, setMaterial_delivery_date] = useState("");
    const [type_material_Id, setType_material_Id] = useState("");
    const [company_Id, setCompany_Id] = useState("");

    const remainingStock = parseInt(material_remaining) + parseInt(stock_material_add);

    const navigate = useNavigate();
    const { material_Id } = useParams();

    const getMaterialById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/getmaterial/${material_Id}`);
        console.log(response);
        setMaterial_remaining(response.data[0].material_remaining);
    };

    useEffect(() => {
        getMaterialById();
    }, []);

    const addorder = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });
            await Axios.post(`http://202.44.40.185:3001/stock_material`, {
                stock_material_Id,
                stock_material_add,
                stock_material_date,
                username,
                material_Id,
            });

            await Axios.put(`http://202.44.40.185:3001/stockmaterial/${material_Id}`, {
                material_Id,
                material_remaining: remainingStock,
            });

            navigate("/mstocklist");
        } catch (error) {
            console.log(error);
        }
    }

    new Date(stock_material_date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const Dates = new Date(stock_material_date);
    const DateStr = `${Dates.getDate()}/${Dates.getMonth() + 1}/${Dates.getFullYear()}`;

    return (
        <div className="Appcontainer">
            <div className="add">
                <form onSubmit={addorder}>
                    <br />
                    <div className="field1">
                        <label className="label">เลขวัสดุ : {material_Id}</label>
                    </div>
                    <div className="field1">
                        <label className="label">จำนวนที่เพิ่ม :</label>
                        <div className="control">
                            <input
                                type="number"
                                className="input"
                                min={1}
                                value={stock_material_add}
                                onChange={(e) => setStock_material_add(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่เพิ่มสต็อก :</label>
                        <div className="control">
                            <label className="label" >{DateStr}</label>
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อผู้เพิ่ม :</label>
                        <div className="control">
                            <label className="label" >{displayname}</label>
                        </div>
                    </div>
                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-primary">
                            เพิ่ม
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Mstock