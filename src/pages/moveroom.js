import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Moveroom() {
    const [durablearticles_Id, setDurablearticles_Id] = useState("");
    const [room_Id, setRoom_Id] = useState("");

    const navigate = useNavigate();
    const updateDurablearticles = async (e) => {
        e.preventDefault();
        try {
            await Axios.put(`http://202.44.40.185:3001/moveroom/${durablearticles_Id}`, {
                durablearticles_Id,
                room_Id,
            });
            navigate("/durablearticlesshow");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App container">
            <div className="information">
                <form onSubmit={updateDurablearticles}>
                    <br />
                    <div className="field">
                        <label className="label">เลขครุภัณฑ์</label>
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
                    <div className="field">
                        <label className="label">เลขห้อง</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={room_Id}
                                    onChange={(e) => setRoom_Id(e.target.value)}
                                >
                                    <option value="">เลือกห้อง</option>
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
                    <br />
                    <div className="field">
                        <button type="submit" class="btn btn-primary">
                            อัพเดต
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Moveroom