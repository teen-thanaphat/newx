import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';

const Dshow2 = () => {

    const [order_durablearticles_location, setOrder_durablearticles_location] = useState("");
    const [order_durablearticles_date, setOrder_durablearticles_date] = useState("");
    const [username, setUsername] = useState("");
    const [durablearticles_Id, setDurablearticles_Id] = useState("");
    const [order_durablearticles_status, setOrder_durablearticles_status] = useState("");

    const navigate = useNavigate();
    const { order_durablearticles_Id } = useParams();

    const getOrderDurablearticlesById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/order_durablearticles/${order_durablearticles_Id}`);
        console.log(response);
        setOrder_durablearticles_location(response.data[0].order_durablearticles_location);
        setOrder_durablearticles_date(response.data[0].order_durablearticles_date);
        setUsername(response.data[0].username);
        setDurablearticles_Id(response.data[0].durablearticles_Id);
        setOrder_durablearticles_status(response.data[0].order_durablearticles_status);
    };

    const dstatus = "ยืมได้";

    const updateorderd = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
              });
            await Axios.put(`http://202.44.40.185:3001/order_durablearticles/${order_durablearticles_Id}`, {
                order_durablearticles_Id,
                order_durablearticles_status,
            });
            if (order_durablearticles_status === "ไม่อนุมัติ") {
                await Axios.put(`http://202.44.40.185:3001/statusdurablearticles/${durablearticles_Id}`, {
                    durablearticles_Id,
                    durablearticles_status: dstatus,
                });
            }
            navigate("/dshow");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrderDurablearticlesById();
    }, []);

    return (
        <div className="Appcontainer">
            <div className="add">
                <form onSubmit={updateorderd}>
                    <br />

                    <div className="field">
                        <label className="label">เลขครุภัณฑ์ : {durablearticles_Id}</label>
                    </div>

                    <div className="field">
                        <label className="label">จัดการ :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={order_durablearticles_status}
                                    onChange={(e) => setOrder_durablearticles_status(e.target.value)}
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

export default Dshow2;