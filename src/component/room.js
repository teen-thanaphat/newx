import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Signin from './Signin'
import Swal from 'sweetalert2';
export default function Room() {
  const [material, setMaterial] = useState([]);
  const storageRepairType = sessionStorage.getItem('repairType');
  const durablearticles_Id=storageRepairType
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [room_Id, setRoom_Id] = useState('');
  const [notifier, setNotifier] = useState('');

  useEffect(() => {
    const getMaterial = async () => {
      const response = await axios.get('http://202.44.40.185:3001/durablearticles');
      setMaterial(response.data);
    };
    getMaterial();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'type') {
      setType(value);
    } else if (name === 'room_Id') {
      setRoom_Id(value);
    } else if (name === 'notifier') {
      setNotifier(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://202.44.40.185:3001/moveroom/${durablearticles_Id}`, { durablearticles_Id, name, type, room_Id})
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขข้อมูลสำเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถแก้ไขข้อมูลได้',
          confirmButtonColor: '#dc3545'
        })
      });
  };


  const displayname = sessionStorage.getItem('displayname');
 
  if(!displayname){
    return <Signin />

  }
  else{
  return (
    <div>
      <br></br>
      <h2> แจ้งย้ายห้องครุภัณฑ์</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        {material.map((val, index) => (
            
          val.durablearticles_Id === storageRepairType && (
            <div key={index}>
              <label>ID:  {durablearticles_Id}</label><br /><br></br>

              <label>ชื่อ:  {val.durablearticles_name}</label><br /><br></br>
              <br></br>
              <label>ประเภท:</label><br /><br></br>
              <input type='text' name='type' value={val.type_durablearticles_Id} onChange={() => setType(val.type_durablearticles_Id)} /><br />
              <br></br>
              <label>ห้อง:</label>
              <select name='room_Id' value={room_Id} onChange={handleInputChange}>
                <option value=''>โปรดเลือก</option>
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
              </select><br />
              <br></br>
              <label>ผู้แจ้ง:</label><br></br>
              <input type='text' name='notifier' value={displayname} onChange={() => setNotifier(displayname)} /><br />
              <br></br>
            </div>
          )
        ))}
        <button type='submit' className='submit'>submit</button>
      </form>
    </div>
  );
}
}
