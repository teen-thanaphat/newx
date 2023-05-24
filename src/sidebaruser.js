import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, NavLink, Routes, Route, useNavigate } from 'react-router-dom'

import Home from './pages/home';

import Changeroom from './pages/changeroom';

import Materialadd from './pages/materialadd';
import Materialshow from './pages/materialshow';
import Materialedit from './pages/materialedit';

import Durablearticlesadd from './pages/durablearticlesadd';
import Durablearticlesshow from './pages/durablearticlesshow';
import Durablearticlesedit from './pages/durablearticlesedit';

import Moveroom from './pages/moveroom';

import Mlist from './pages/mlist';
import Mcart from './pages/mcart';
import Mshow from './pages/mshow';
import Mshow2 from './pages/mshow2';
import Mstock from './pages/mstock';
import Mstocklist from './pages/mstocklist';
import Mstockshow from './pages/mstockshow';

import Dlist from './pages/dlist';
import Dcart from './pages/dcart';
import Dshow from './pages/dshow';
import Dshow2 from './pages/dshow2';

import Dreturn from './pages/dreturn';
import Dreturnlist from './pages/dreturnlist';
import Dreturnshow from './pages/dreturnshow';

import Signin from './pages/Signin';

import Qrcode from './pages/qrcode';
import Morder2 from './pages/morder2';
import Dorder2 from './pages/dorder2';
import Rorder from './pages/rorder';

function App() {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear();
        // window.location.reload();
        // window.location.href = 'http://202.44.40.185:3001'
        window.location.href = 'http://202.44.40.185'
    }
    const displayname = sessionStorage.getItem('displayname');


    return (
        <>
        <div class="sidenav">
            <a>ชื่อ {displayname}</a><hr/>
            <a class="navbar-brand" ><NavLink to="/home">Home</NavLink></a>

            <a><div class="dropdown">
                <button class="dropbtn">เบิก วัสดุ/ครุภัณฑ์
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a class="nav-link active" aria-current="page"><NavLink to="/mlist">วัสดุ</NavLink></a>
                    <a class="nav-link active" aria-current="page"><NavLink to="/dlist">ครุภัณฑ์</NavLink></a>
                </div>
            </div></a>

            <a><div class="dropdown">
                
                <a class="nav-link active" aria-current="page"><NavLink to="/changeroom">ย้ายครุภัณฑ์</NavLink></a>
               
            </div></a>

            <a><div class="dropdown">
                <button class="dropbtn">รายการเบิก
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a class="nav-link active" aria-current="page"><NavLink to="/morder2">วัสดุ</NavLink></a>
                    <a class="nav-link active" aria-current="page"><NavLink to="/dorder2">ครุภัณฑ์</NavLink></a>
                </div>
            </div></a>

            <a><div class="dropdown">
                <button class="dropbtn">รายการแจ้งซ่อม
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content">
                    <a class="nav-link active" aria-current="page"><NavLink to="/rorder">ครุภัณฑ์</NavLink></a>
                </div>
            </div></a><hr/>

            <div>
                <a class="nav-link active" onClick={handleLogout}>ออกจากระบบ <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z" />
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                </svg></a>
            </div>
        </div>

        <div class="content">
            <Routes>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/materialadd' element={<Materialadd />}></Route>
                <Route path='/materialshow' element={<Materialshow />}></Route>
                <Route path='/materialedit/:material_Id' element={<Materialedit />}></Route>
                <Route path='/durablearticlesadd' element={<Durablearticlesadd />}></Route>
                <Route path='/durablearticlesshow' element={<Durablearticlesshow />}></Route>
                <Route path='/durablearticlesedit/:durablearticles_Id' element={<Durablearticlesedit />}></Route>
                <Route path='/moveroom' element={<Moveroom />}></Route>

                <Route path='/mlist' element={<Mlist />}></Route>
                <Route path='/mcart/:material_Id' element={<Mcart />}></Route>
                <Route path='/mshow' element={<Mshow />}></Route>
                <Route path='/mshow2/:order_material_Id' element={<Mshow2 />}></Route>
                <Route path='/mshow2/:material_Id' element={<Mshow2 />}></Route>
                <Route path='/mstock/:material_Id' element={<Mstock />}></Route>
                <Route path='/mstocklist' element={<Mstocklist />}></Route>
                <Route path='/mstockshow' element={<Mstockshow />}></Route>


                <Route path='/dlist' element={<Dlist />}></Route>
                <Route path='/dcart/:durablearticles_Id' element={<Dcart />}></Route>
                <Route path='/dshow' element={<Dshow />}></Route>
                <Route path='/dshow2/:order_durablearticles_Id' element={<Dshow2 />}></Route>
                <Route path='/dshow2/:durablearticles_Id' element={<Dshow2 />}></Route>

                <Route path='/dreturnlist' element={<Dreturnlist />}></Route>
                <Route path='/dreturn/:order_durablearticles_Id' element={<Dreturn />}></Route>
                <Route path='/dreturnshow' element={<Dreturnshow />}></Route>

                {/* <Route path='/Signin' element={<Signin />}></Route> */}
                <Route path='/qrcode/:durablearticles_Id' element={<Qrcode />}></Route>
                <Route path='/morder2' element={<Morder2 />}></Route>
                <Route path='/dorder2' element={<Dorder2 />}></Route>
                <Route path='/rorder' element={<Rorder />}></Route>
                <Route path='/changeroom' element={<Changeroom />}></Route>



                </Routes>
            </div>
        </>
    )
}

export default App;
