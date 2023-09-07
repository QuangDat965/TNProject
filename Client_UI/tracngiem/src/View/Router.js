import React from "react";
import Topic from "./Topic";
import Question from "./Question";
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import AddSubject from "./AddSubject";


export default class Layout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render() {
        return <div className="layout-container">
             <Router>
      <div>

        <Routes>
          <Route path="/" element={<Topic />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/addsubject" element={<AddSubject />} />
          <Route path="/question/:id" element={<Question />} />
        </Routes>
      </div>
    </Router>
        </div>
    }
}