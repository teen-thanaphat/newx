import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './changeroom.css'

import Swal from 'sweetalert2';
function Changeroom() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const [room, setRoom] = useState("ไม่ทราบ");
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const handleSelectAll = (event) => {
    const checked = event.target.checked;

    if (checked) {
      const allIds = items.map(item => item.durablearticles_Id);
      setSelectedItems(allIds);
      setSelectAll(true);
    } else {
      setSelectedItems([]);
      setSelectAll(false);
    }
  }
  function handleInputChange(event) {
    const { name, value } = event.target;

    if (name === "room") {
      setRoom(value);
    }
  }
  const handleReset = () => {
    setSelectedItems([]);
  };
  useEffect(() => {
    axios.get('http://202.44.40.185:3001/room_durablearticles_change')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleCheckboxChange = (event) => {
    const itemId = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  }

  const handleNewRoomChange = (event) => {
    setNewRoom(event.target.value);
  }

  const handleMoveItems = async () => {
    if (!newRoom) {
      Swal.fire({
        icon: 'warning',
        title: 'โปรดระบุสถานที่',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }
    try {
      await axios.post('http://202.44.40.185:3001/move-items', {
        itemIds: selectedItems,
        newRoom: newRoom
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        timer: 2000,
        showConfirmButton: false
      });
      window.location.reload()
      navigate("/changeroom");
    } catch (err) {
      console.log(err);
    }
  }
  

  return (
      <div className='header'>
        <div className="columns mt-5 is-centered">
          <div className="column is-half">
            <div className="field">
              <div className="control">

                <label>ค้นหาห้อง:</label>
                <select className="input" name="room" value={room} onChange={handleInputChange}>
                  <option value="ไม่ทราบ">ไม่ทราบ</option>
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


              </div>
            </div>
            <div>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              <label>Select All</label>
            </div>
            <table className="table" style={{ tableLayout: "fixed", width: "90%", margin: "0 auto" }}>
              <thead>
                <th scope="col" className="col-1">ID</th>
                <th scope="col" className="col-1">ชื่อครุภัณฑ์</th>
                <th scope="col" className="col-1">ห้อง</th>
              </thead>
              <tbody>
                {items.filter(val => val.room_Id.toLowerCase().includes(room.toLowerCase()))
                  .map(item => (
                    <tr key={item.durablearticles_Id}>
                      <td>
                        <input
                          type="checkbox"
                          value={item.durablearticles_Id}
                          checked={selectedItems.includes(item.durablearticles_Id)}
                          onChange={handleCheckboxChange}
                        />
                        <label>{item.durablearticles_Id}</label>
                      </td>
                      <td><label>{item.durablearticles_name}</label></td>
                      <td><label>{item.room_Id}</label></td>
                    </tr>
                  ))}

              </tbody>
            </table>
            <button className='btn btn-danger' onClick={handleReset}>รีเซ็ต</button>
            <label>
              ย้ายไปห้อง:
              <div className="control">
                <select value={newRoom} onChange={handleNewRoomChange}>
                  <option value="select">select</option>
                  <option value="ไม่ทราบ">ไม่ทราบ</option>
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

              </div>

            </label>
            <button onClick={handleMoveItems}>ย้ายครุภัณฑ์</button>
          </div>
        </div>
      </div>
    );
  }

  export default Changeroom;
