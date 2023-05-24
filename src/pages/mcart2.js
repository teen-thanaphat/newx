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
  const [username, setUsername] = useState("")

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
    setMaterial_brand(response.data[0].material_brand);
    setMaterial_unit(response.data[0].material_unit);
    setMaterial_price(response.data[0].material_price);
    setMaterial_remaining(response.data[0].material_remaining);
    setMaterial_order_date(response.data[0].material_order_date);
    setMaterial_delivery_date(response.data[0].material_delivery_date);
    setType_material_Id(response.data[0].type_material_Id);
    setCompany_Id(response.data[0].company_Id);
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
              <select
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              >
                <option value="">-- เลือกชื่อผู้เบิก --</option>
                <option value="ฐิตินันท์ ขันทอง">ฐิตินันท์ ขันทอง</option>
                <option value="อาลิษา หุ่นไทย">อาลิษา หุ่นไทย</option>
                <option value="จันทิมา อรรฆรุจิรัตน์">จันทิมา อรรฆรุจิรัตน์</option>
                <option value="เกรียงไกร เอี่ยมวงค์">เกรียงไกร เอี่ยมวงค์</option>
                <option value="นที ปัญญาประสิทธิ์">นที ปัญญาประสิทธิ์</option>
                <option value="อุษณีย์ บัลลังน้อย">อุษณีย์ บัลลังน้อย</option>
                <option value="อัครา ประโยชน์">อัครา ประโยชน์</option>
                <option value="ลือพล พิพานเมฆาภรณ์">ลือพล พิพานเมฆาภรณ์</option>
                <option value="ธนภัทร์ อนุศาสน์อมรกุล">ธนภัทร์ อนุศาสน์อมรกุล</option>
                <option value="ปรัชญาพร เลี้ยงสุทธิสกนธ์">ปรัชญาพร เลี้ยงสุทธิสกนธ์</option>
                <option value="สุวัจชัย กมลสันติโรจน์">สุวัจชัย กมลสันติโรจน์</option>
                <option value="คันธารัตน์ อเนกบุณย์">คันธารัตน์ อเนกบุณย์</option>
                <option value="นิกร สุทธิเสงี่ยม">นิกร สุทธิเสงี่ยม</option>
                <option value="นนทกร สถิตานนท์">นนทกร สถิตานนท์</option>
                <option value="กฤดาภัทร สีหารี">กฤดาภัทร สีหารี</option>
                <option value="กอบเกียรติ สระอุบล">กอบเกียรติ สระอุบล</option>
                <option value="ปรวัฒน์ วิสูตรศักดิ์">ปรวัฒน์ วิสูตรศักดิ์</option>
                <option value="เบญจพร ลิ้มธรรมาภรณ์">เบญจพร ลิ้มธรรมาภรณ์</option>
                <option value="เฉียบวุฒิ รัตนวิไลสกุล">เฉียบวุฒิ รัตนวิไลสกุล</option>
                <option value="สถิตย์ ประสมพันธ์">สถิตย์ ประสมพันธ์</option>
                <option value="เอิญ สุริยะฉาย">เอิญ สุริยะฉาย</option>
                <option value="ณัฐวุฒิ สร้อยดอกสน">ณัฐวุฒิ สร้อยดอกสน</option>
                <option value="อนุสรณ์ วงษ์สนิท">อนุสรณ์ วงษ์สนิท</option>
                <option value="ยนต์ชนก เขาแก้ว">ยนต์ชนก เขาแก้ว</option>
                <option value="สรร รัตนสัญญา">สรร รัตนสัญญา</option>
                <option value="ธรรศฏภณ สุระศักดิ์">ธรรศฏภณ สุระศักดิ์</option>
                <option value="ณัฐกิตติ์ จิตรเอื้อตระกูล">ณัฐกิตติ์ จิตรเอื้อตระกูล</option>
                <option value="อภิสิทธิ์ รัตนาตรานุรักษ์">อภิสิทธิ์ รัตนาตรานุรักษ์</option>
                <option value="Admin">Admin</option>
              </select>
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