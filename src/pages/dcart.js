import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';
const Dcart = () => {

    const [order_durablearticles_Id, setOrder_durablearticles_Id] = useState("");
    const [order_durablearticles_location, setOrder_durablearticles_location] = useState("");
    const [order_durablearticles_date, setOrder_durablearticles_date] = useState(new Date().toISOString().slice(0, 10));
    const displayname = sessionStorage.getItem('displayname');
    const username = displayname;

    const [durablearticles_name, setDurablearticles_name] = useState("");
    const [durablearticles_brand, setDurablearticles_brand] = useState("");
    const [durablearticles_unit, setDurablearticles_unit] = useState("");
    const [durablearticles_price, setDurablearticles_price] = useState("");
    const [durablearticles_order_date, setDurablearticles_order_date] = useState("");
    const [durablearticles_delivery_date, setDurablearticles_delivery_date] = useState("");
    const [durablearticles_repair_date, setDurablearticles_repair_date] = useState("");
    const [durablearticles_finish_date, setDurablearticles_finish_date] = useState("");
    const [type_durablearticles_Id, setType_durablearticles_Id] = useState("");
    const [company_Id, setCompany_Id] = useState("");
    const [room_Id, setRoom_Id] = useState("");
    const [durablearticles_status, setDurablearticles_status] = useState("");
    const [show, setshow] = useState(false)
    const [hide, sethide] = useState(true)
    const showinput = () => {
        setshow(true);
        sethide(false)
    }
    const hideselect = () => {
        sethide(true)
        setshow(false);
    }
    async function handle(event) {
        event.preventDefault();
    }
    const navigate = useNavigate();
    const { durablearticles_Id } = useParams();

    const newstatus = "ยืมไม่ได้";

    const getDurablearticlesById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/getdurablearticles/${durablearticles_Id}`);
        console.log(response);
        setDurablearticles_name(response.data[0].durablearticles_name);
    };

    useEffect(() => {
        getDurablearticlesById();
    }, []);

    const addorder = async (e) => {
        if (!order_durablearticles_location) {
            Swal.fire({
                icon: 'warning',
                title: 'โปรดระบุสถานที่',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }
        e.preventDefault();
        try {
            await Axios.post(`http://202.44.40.185:3001/order_durablearticles`, {
                order_durablearticles_Id,
                order_durablearticles_location,
                order_durablearticles_date,
                username,
                durablearticles_Id,
                durablearticles_name,
            });
            await Axios.put(`http://202.44.40.185:3001/statusdurablearticles/${durablearticles_Id}`, {
                durablearticles_Id,
                durablearticles_status: newstatus,
            });
            Swal.fire({
                icon: 'success',
                title: 'Success',
                timer: 2000,
                showConfirmButton: false
            });
            navigate("/dlist");

        } catch (error) {
            console.log(error);
        }
    };

    new Date(order_durablearticles_date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    const Dates = new Date(order_durablearticles_date);
    const DateStr = `${Dates.getDate()}/${Dates.getMonth() + 1}/${Dates.getFullYear()}`;

    return (
        <div className="Appcontainer">
            <div className="add2">
                <form onSubmit={handle}>
                    <br />

                    <div className="field1">
                        <label className="label">เลขครุภัณฑ์ : {durablearticles_Id}</label>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อครุภัณฑ์ : {durablearticles_name}</label>
                    </div>

                    <div className="field1">
                        <label className="label">ยืมไปใช้ที่ไหน :</label>
                        <div className="control">
                            <br></br>
                            {hide && (
                                <select value={order_durablearticles_location} onChange={(e) => setOrder_durablearticles_location(e.target.value)}>
                                    <option value="select">select</option>
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
                                </select>
                            )}

                            {show && (
                                <input
                                    type="text"
                                    className="inputroom"
                                    value={order_durablearticles_location}
                                    onChange={(e) => setOrder_durablearticles_location(e.target.value)}
                                    placeholder=""
                                />
                            )}
                            <button className='btn btn-danger' onClick={show ? hideselect : showinput}>
                                {show ? "เลือกห้อง" : "อื่นๆ"}
                            </button>
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">วันที่ยืม :</label>
                        <div className="control">
                            <label className="label" >{DateStr}</label>
                        </div>
                    </div>
                    <div className="field1">
                        <label className="label">ชื่อผู้ยืม :</label>
                        <div className="control">
                            <label className="label" >{displayname}</label>
                        </div>
                    </div>

                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-success" onClick={addorder}>
                            ยืม
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Dcart;