import Axios from 'axios'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';
function AddAdmin() {

  const [admin_name, setadmin_name] = useState("");

  const navigate = useNavigate();

  const save = async (e) => {
    e.preventDefault();
    try {
        Swal.fire({
            title: 'Add Success!',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
          });
      await Axios.post('http://202.44.40.185:3001/addadmin', {
        admin_name,
      });
      navigate("/Adminshow");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Appcontainer">
      <div className="add">
        <form onSubmit={save}>
          <br />
          <div className="field1">
            <label className="label">ชื่อ-นามสกุล :</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={admin_name}
                onChange={(e) => setadmin_name(e.target.value)}
                placeholder="ฐิตินันท์ ขันทอง"
              />
            </div>
          </div>

          <br />
          <div className="field">
            <button type="submit" class="btn btn-primary">
              เพิ่ม
            </button>
          </div>
        </form>
      </div><br />
    </div>
  );
};

export default AddAdmin;
