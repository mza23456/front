import React, { Component } from "react";
import { Routes, Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";
import About from "./components/About";


class App extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand navbar-info bg-warning">
          <Link to="/Tutorial" className="navbar-brand">
            North Bangkok University
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to="/Tutorial" className="nav-link">
                    บทเรียน
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/add" className="nav-link">
                    เพิ่ม
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
                <Route path="/" element={<TutorialsList />} />
                <Route path="/Tutorial" element={<TutorialsList />} />
                <Route path="/add" element={<AddTutorial />} />
                <Route path="/Tutorial/:id" element={<Tutorial />} />
                <Route path="/About" element={<About />} />
            </Routes>
        </div>
      </>
    )
  }
}

export default App;