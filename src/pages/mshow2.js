import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';

const Mshow2 = () => {

    const [order_material_quantity, setOrder_material_quantity] = useState("");
    const [order_material_date, setOrder_material_date] = useState("");
    const [username, setUsername] = useState("");
    const [material_Id, setMaterial_Id] = useState("");
    const [order_material_status, setOrder_material_status] = useState("");
    const [material_remaining, setMaterial_remaining] = useState("");

    const navigate = useNavigate();
    const { order_material_Id } = useParams();

    const getOrderMaterialById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/order_material/${order_material_Id}`);
        console.log(response);
        setOrder_material_quantity(response.data[0].order_material_quantity);
        setOrder_material_date(response.data[0].order_material_date);
        setUsername(response.data[0].username);
        setMaterial_Id(response.data[0].material_Id);
        setOrder_material_status(response.data[0].order_material_status);
        setMaterial_remaining(response.data[0].material_remaining);
    };

    const remainingStock = parseInt(material_remaining) + parseInt(order_material_quantity);
    const updateorderm = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
              });
            await Axios.put(`http://202.44.40.185:3001/order_material/${order_material_Id}`, {
                order_material_Id,
                order_material_status,
            });
            if (order_material_status === "ไม่อนุมัติ") {
                await Axios.put(`http://202.44.40.185:3001/stockmaterial/${material_Id}`, {
                    material_Id,
                    material_remaining: remainingStock,
                });
            }
            navigate("/mshow");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrderMaterialById();
    }, []);

    return (
        <div className="Appcontainer">
            <div className="add">
                <form onSubmit={updateorderm}>
                    <br />

                    <div className="field">
                        <label className="label">เลขวัสดุ : {material_Id}</label>
                    </div>

                    <div className="field">
                        <label className="label">จัดการ :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={order_material_status}
                                    onChange={(e) => setOrder_material_status(e.target.value)}
                                >
                                    <option value="">เลือกอนุมัติ/ไม่อนุมัติ</option>
                                    <option value="อนุมัติ">อนุมัติ</option>
                                    <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-success">
                            ยืนยัน
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Mshow2;