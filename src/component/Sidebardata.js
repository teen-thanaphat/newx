import { useState, useEffect } from 'react';
import './Sidebardata.css';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import Reportrepair from './reportrepair';
import Home from './Home';
import Repair from './repair';
import Room from './room';

function Sidebardata() {
  const displayname = sessionStorage.getItem('displayname');
  const [repairType, setRepairType] = useState('');


  useEffect(() => {
    const storageRepairType = sessionStorage.getItem('repairType');
    if (storageRepairType) {
      setRepairType(storageRepairType);
    }
  }, []);

  useEffect(() => {
    if (window.location.pathname.startsWith('/repairS')) {
      const type = window.location.pathname.split('/')[2];
      setRepairType(type);
      sessionStorage.setItem('repairType', type);
    }
  }, [window.location]);
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  }
  
  if(!displayname){
    return (
      <>
        <div class="sidenav1">
        <a class="navbar-brand" ><NavLink to="/"></NavLink></a>
          <a class="navbar-brand" ><NavLink to={`/repairS/${repairType}`}>แจ้งซ่อม</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/room">แจ้งย้าย</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/reportrepair">แจ้ง</NavLink></a>
        </div>
        <div class="content1">
          <Routes>
            <Route exact path='/' element={<Room />}></Route>
            <Route exact path='/repairS/:type' element={<Repair />}></Route>
            <Route exact path='/room' element={<Room />}></Route>
            <Route exact path='/reportrepair' element={<Reportrepair />}></Route>
          </Routes>
        </div>
      </>
    )
  }
  else{
    return (
      <>
        <div class="sidenav1">
          <a class="navbar-brand" ><NavLink to={`/repairS/${repairType}`}>แจ้งซ่อม</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/room">แจ้งย้าย</NavLink></a>
          <a class="navbar-brand" ><NavLink to="/reportrepair">แจ้ง</NavLink></a>
          <a class="navbar-brand" onClick={handleLogout}><NavLink to="/signin">LogOut</NavLink></a>
        </div>
        <div class="content1">
          <Routes>
            <Route exact path='/repairS/:type' element={<Repair />}></Route>
            <Route exact path='/room' element={<Room />}></Route>
            <Route exact path='/reportrepair' element={<Reportrepair />}></Route>
          </Routes>
        </div>
      </>
    )
  }
  
}

export default Sidebardata;
