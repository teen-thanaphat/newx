import './App.css';
import { useEffect } from 'react'
import { BrowserRouter, NavLink, Routes, Route, useNavigate } from 'react-router-dom'

import Home2 from './pages/home2';

import Changeroom from './pages/changeroom';

import Materialadd from './pages/materialadd';
import Materialshow from './pages/materialshow';
import Materialedit from './pages/materialedit';
import Mstatus from './pages/mstatus';
import Mstatuslist from './pages/mstatuslist';
import Mstatusshow from './pages/mstatusshow';

import Durablearticlesadd from './pages/durablearticlesadd';
import Durablearticlesshow from './pages/durablearticlesshow';
import Durablearticlesedit from './pages/durablearticlesedit';
import Dstatuslist from './pages/dstatuslist';

import Moveroom from './pages/moveroom';
import Companyadd from './pages/companyadd';
import Companyshow from './pages/companyshow';

import Mlist from './pages/mlist';
import Mcart from './pages/mcart';
import Mlist2 from './pages/mlist2';
import Mcart2 from './pages/mcart2';
import Mshow from './pages/mshow';
import Mshow2 from './pages/mshow2';

import Mstock from './pages/mstock';
import Mstock2 from './pages/mstock2';
import Mstocklist from './pages/mstocklist';
import Mstockshow from './pages/mstockshow';

import Dlist from './pages/dlist';
import Dcart from './pages/dcart';
import Dlist2 from './pages/dlist2';
import Dcart2 from './pages/dcart2';
import Dshow from './pages/dshow';
import Dshow2 from './pages/dshow2';

import Dreturn from './pages/dreturn';
import Dreturnlist from './pages/dreturnlist';
import Dreturnshow from './pages/dreturnshow';

import Signin from './pages/Signin';

import Qrcode from './pages/qrcode';
import Morder from './pages/morder';
import Dorder from './pages/dorder';

import Repair from './pages/repair';
import Repair2 from './pages/repair2';
import Repairshow from './pages/repairshow';
import Sorder from './pages/sorder';

import Mdetail from './pages/mdetail';
import Ddetail from './pages/ddetail';

import AddAdmin from './pages/adminadd';
import Adminshow from './pages/adminshow';

function App() {
  
  const handleLogout = () => {
    sessionStorage.clear();
    //window.location.reload();
    //window.location.href = 'http://202.44.40.185:3001'
    window.location.href = 'http://202.44.40.185'
  }
  const displayname = sessionStorage.getItem('displayname');


  return (
    <>
      <div class="sidenav">
        <a>ชื่อ {displayname}</a><hr />
        <a class="navbar-brand" ><NavLink to="/home2">Home</NavLink></a>
        <a><div class="dropdown">
          <button class="dropbtn">จัดการวัสดุ
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/materialadd">เพิ่ม</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/materialshow">แสดง</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/mstatusshow">จำหน่าย</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">จัดการครุภัณฑ์
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/durablearticlesadd">เพิ่ม</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/durablearticlesshow">แสดง</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/dstatuslist">จำหน่าย</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/changeroom">ย้ายห้อง</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">เบิก วัสดุ/ครุภัณฑ์
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/mlist2">วัสดุ</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/dlist2">ครุภัณฑ์</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">จัดการสต็อก
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/mstocklist">เพิ่มสต็อกวัสดุ</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/mstockshow">ดูการเพิ่มสต็อกวัสดุ</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">เพิ่มบริษัท
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/companyadd">เพิ่มบริษัท</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/companyshow">ดูรายชื่อบริษัท</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">จัดการใบเบิก
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/mshow">วัสดุ</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/dshow">ครุภัณฑ์</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">จัดการคืน
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/dreturnlist">คืนครุภัณฑ์</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/dreturnshow">รายการคืน</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">จัดการแจ้งซ่อม
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/repair">แจ้งซ่อมครุภัณฑ์</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/repairshow">รายการแจ้งซ่อม</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">จัดการรายชื่อ admin
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/addadmin">เพิ่ม admin</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/Adminshow">จัดการadmin</NavLink></a>
          </div>
        </div></a>

        <a><div class="dropdown">
          <button class="dropbtn">ออกรายงาน
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content">
            <a class="nav-link active" aria-current="page"><NavLink to="/morder">รายงานการเบิกวัสดุ</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/dorder">รายงานการยืมครุภัณฑ์</NavLink></a>
            <a class="nav-link active" aria-current="page"><NavLink to="/sorder">รายงานสต็อกวัสดุ</NavLink></a>
          </div>
          
        </div></a><hr />



        <div>
          <a class="nav-link active" onClick={handleLogout}>ออกจากระบบ <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
          </svg></a>
        </div>
      </div>

      <div class="content">
        <Routes>
          <Route path='/home2' element={<Home2 />}></Route>
          <Route path='/materialadd' element={<Materialadd />}></Route>
          <Route path='/materialshow' element={<Materialshow />}></Route>
          <Route path='/materialedit/:material_Id' element={<Materialedit />}></Route>
          <Route path='/durablearticlesadd' element={<Durablearticlesadd />}></Route>
          <Route path='/durablearticlesshow' element={<Durablearticlesshow />}></Route>
          <Route path='/durablearticlesedit/:durablearticles_Id' element={<Durablearticlesedit />}></Route>
          <Route path='/moveroom' element={<Moveroom />}></Route>
          <Route path='/mstatus/:material_Id' element={<Mstatus />}></Route>
          <Route path='/mstatuslist' element={<Mstatuslist />}></Route>
          <Route path='/mstatusshow' element={<Mstatusshow />}></Route>
          <Route path='/dstatuslist' element={<Dstatuslist />}></Route>

          <Route path='/mlist' element={<Mlist />}></Route>
          <Route path='/mlist2' element={<Mlist2 />}></Route>
          <Route path='/mcart/:material_Id' element={<Mcart />}></Route>
          <Route path='/mcart2/:material_Id' element={<Mcart2 />}></Route>
          <Route path='/mshow' element={<Mshow />}></Route>
          <Route path='/mshow2/:order_material_Id' element={<Mshow2 />}></Route>
          <Route path='/mshow2/:material_Id' element={<Mshow2 />}></Route>

          <Route path='/mstock/:material_Id' element={<Mstock />}></Route>
          <Route path='/mstock2/:material_Id' element={<Mstock2 />}></Route>
          <Route path='/mstocklist' element={<Mstocklist />}></Route>
          <Route path='/mstockshow' element={<Mstockshow />}></Route>

          <Route path='/companyadd' element={<Companyadd />}></Route>
          <Route path='/companyshow' element={<Companyshow />}></Route>

          <Route path='/dlist' element={<Dlist />}></Route>
          <Route path='/dcart/:durablearticles_Id' element={<Dcart />}></Route>
          <Route path='/dlist2' element={<Dlist2 />}></Route>
          <Route path='/dcart2/:durablearticles_Id' element={<Dcart2 />}></Route>
          <Route path='/dshow' element={<Dshow />}></Route>
          <Route path='/dshow2/:order_durablearticles_Id' element={<Dshow2 />}></Route>
          <Route path='/dshow2/:durablearticles_Id' element={<Dshow2 />}></Route>

          <Route path='/dreturnlist' element={<Dreturnlist />}></Route>
          <Route path='/dreturn/:order_durablearticles_Id' element={<Dreturn />}></Route>
          <Route path='/dreturnshow' element={<Dreturnshow />}></Route>

          {/* <Route path='/Signin' element={<Signin />}></Route> */}
          <Route path='/qrcode/:durablearticles_Id' element={<Qrcode />}></Route>
          <Route path='/morder' element={<Morder />}></Route>
          <Route path='/dorder' element={<Dorder />}></Route>

          <Route path='/repair' element={<Repair />}></Route>
          <Route path='/repair2/:repair_durablearticles_Id' element={<Repair2 />}></Route>
          <Route path='/repairshow' element={<Repairshow />}></Route>
          <Route path='/sorder' element={<Sorder />}></Route>

          <Route path='/mdetail/:material_Id' element={<Mdetail />}></Route>
          <Route path='/ddetail/:durablearticles_Id' element={<Ddetail />}></Route>

          <Route path='/addadmin' element={<AddAdmin />}></Route>
          <Route path='/Adminshow' element={<Adminshow />}></Route>
          <Route path='/changeroom' element={<Changeroom />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App;