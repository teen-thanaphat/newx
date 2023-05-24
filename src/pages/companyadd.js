import Axios from 'axios'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';

function Company() {

  const [company_name, setCompany_name] = useState("");
  const [company_detail, setCompany_detail] = useState("");

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
      await Axios.post('http://202.44.40.185:3001/createcompany', {
        company_name,
        company_detail,
      });
      navigate("/companyshow");
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
            <label className="label">ชื่อบริษัท :</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={company_name}
                onChange={(e) => setCompany_name(e.target.value)}
                placeholder="ชื่อบริษัท"
              />
            </div>
          </div>
          <div className="field1">
            <label className="label">รายละเอียดบริษัท :</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={company_detail}
                onChange={(e) => setCompany_detail(e.target.value)}
                placeholder="เบอร์ หรือ ที่ตั้งบริษัท"
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

export default Company;
