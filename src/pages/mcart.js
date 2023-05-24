import Axios from 'axios'
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './add.css';
import Swal from 'sweetalert2';

const Mcart = () => {

  const [order_material_Id, setOrder_material_Id] = useState("");
  const [order_material_quantity, setOrder_material_quantity] = useState("");
  const [order_material_date, setOrder_material_date] = useState(new Date().toISOString().slice(0, 10));
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

  const navigate = useNavigate();
  const { material_Id } = useParams();

  const getMaterialById = async () => {
    const response = await Axios.get(`http://202.44.40.185:3001/getmaterial/${material_Id}`);
    console.log(response);
    setMaterial_name(response.data[0].material_name);
    setMaterial_unit(response.data[0].material_unit);
    setMaterial_remaining(response.data[0].material_remaining);
  };

  const remainingStock = material_remaining - order_material_quantity;

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
      await Axios.post(`http://202.44.40.185:3001/order_material`, {
        order_material_Id,
        order_material_quantity,
        order_material_date,
        username,
        material_Id,
        material_name,
      });
      await Axios.put(`http://202.44.40.185:3001/stockmaterial/${material_Id}`, {
        material_Id,
        material_remaining: remainingStock,
      });

      navigate("/mlist");
    } catch (error) {
      console.log(error);
    }
  };

  new Date(order_material_date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const Dates = new Date(order_material_date);
  const DateStr = `${Dates.getDate()}/${Dates.getMonth() + 1}/${Dates.getFullYear()}`;

  return (
    <div className="Appcontainer">
      <div className="add2">
        <form onSubmit={addorder}>
          <br />

          <div className="field1">
            <label className="label">เลขวัสดุ : {material_Id}</label>
          </div>
          <div className="field1">
            <label className="label">ชื่อวัสดุ : {material_name}</label>
          </div>
          <div className="field1">
            <label className="label">คงเหลือ : {material_remaining} {material_unit}</label>
          </div>

          <div className="field1">
            <label className="label">จำนวนที่เบิก :</label>
            <div className="control">
              <input
                type="number"
                className="input"
                pattern='999|[0-9]*'
                max={material_remaining}
                min={1}
                value={order_material_quantity}
                onChange={(e) => setOrder_material_quantity(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
          <div className="field1">
            <label className="label">วันที่เบิก :</label>
            <div className="control">
              <label className="label" >{DateStr}</label>
            </div>
          </div>
          <div className="field1">
            <label className="label">ชื่อผู้เบิก :</label>
            <div className="control">
              <label className="label" >{displayname}</label>
            </div>
          </div>

          <br />
          <div className="field">
            <button type="submit" class="btn btn-success">
              เบิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Mcart;