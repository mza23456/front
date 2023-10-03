import React, { Component } from "react";
import { Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddStudent from "./components/AddStudent";
import Student from "./components/Student";
import StudentsList from "./components/StudentsList";
import About from "./components/About";


class App extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand navbar-info bg-primary">
          <Link to="/Student" className="navbar-brand">
            North Bangkok University
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to="/Student" className="nav-link">
                    รายชื่อนักศึกษา
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/Add" className="nav-link">
                    ระบบทะเบียนออนไลน์
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/About" className="nav-link">
                    เกี่ยวกับ
                </Link>
            </li>
          </div> 
        </nav>

        <div className="container mt-3">
            <Routes>
                <Route path="/" element={<StudentsList />} />
                <Route path="/Student" element={<StudentsList />} />
                <Route path="/add" element={<AddStudent />} />
                <Route path="/Student/:id" element={<Student />} />
                <Route path="/About" element={<About />} />
            </Routes>
        </div>
      </>
    )
  }
}

export default App;