import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Route,Routes,
    Link
} from "react-router-dom";

import Home from './Home';
import Room from './room';
import Repair from './repair';
import Qrcode from './qrcode';
import App from '../App';

export default class NavbarComp extends Component {
    render() {
        return (
            <Router>
                <div>

                    <Navbar bg="dark" variant={"dark"} expand="lg">
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                <Nav.Link as={Link} to="/repair">แจ้งซ่อม</Nav.Link>
                                <Nav.Link as={Link} to="/room">แจ้งย้าย</Nav.Link>
                                <Nav.Link as={Link} to="/QR">QRCode</Nav.Link>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div>
                <Routes>
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='/repair' element={<Repair />}></Route>
                    <Route path='/room' element={<Room />}></Route>
                    <Route path='/QR' element={<Qrcode />}></Route>

                </Routes>
                </div>
            </Router>
        )
    }
}