import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';

const Dshow2 = () => {

    const [room, setRoom] = useState("");
    const [repair_img, setRepair_img] = useState("");
    const [repair_detail, setRepair_detail] = useState("");
    const [Informer, setInformer] = useState("");
    const [repair_durablearticles_date, setRepair_durablearticles_date] = useState("");
    const [durablearticles_Id, setDurablearticles_Id] = useState("");
    const [repair_status, setRepair_status] = useState("");

    const navigate = useNavigate();
    const { repair_durablearticles_Id } = useParams();

    const getRepairById = async () => {
        const response = await Axios.get(`http://202.44.40.185:3001/repair/${repair_durablearticles_Id}`);
        console.log(response);
        setRoom(response.data[0].room);
        setRepair_img(response.data[0].repair_img);
        setRepair_detail(response.data[0].repair_detail);
        setInformer(response.data[0].Informer);
        setRepair_durablearticles_date(response.data[0].repair_durablearticles_date);
        setDurablearticles_Id(response.data[0].durablearticles_Id);
        setRepair_status(response.data[0].repair_status);
    };

    const update = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                title: "Success!",
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
            });

            // Update repair status
            await Axios.put(`http://202.44.40.185:3001/repair/${repair_durablearticles_Id}`, {
                repair_durablearticles_Id,
                repair_status,
            });

            // Update durablearticles status if repair_status is "จำหน่าย"
            if (repair_status === "จำหน่าย") {
                await Axios.put(
                    `http://202.44.40.185:3001/statusdurablearticles/${durablearticles_Id}`,
                    {
                        durablearticles_Id,
                        durablearticles_status: "ยืมไม่ได้",
                    }
                );
            }
            navigate("/repair");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRepairById();
    }, []);

    return (
        <div className="Appcontainer">
            <div className="add">
                <form onSubmit={update}>
                    <br />

                    <div className="field">
                        <label className="label">เลขครุภัณฑ์ : {durablearticles_Id}</label>
                    </div>

                    <div className="field">
                        <label className="label">จัดการ :</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={repair_status}
                                    onChange={(e) => setRepair_status(e.target.value)}
                                >
                                    <option value="">-- เลือก --</option>
                                    <option value="จำหน่าย">จำหน่าย</option>
                                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
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