import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Dashboard from './Dashboard';
import StudentList from './StudentList';
import AddStudent from './AddStudent';
import './App.css'; 
import "./common.css"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <div>
            <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/student-list">Student List</Link>
              </li>
              <li>
                <Link to="/add-student">Add Student</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ToastContainer />

        <Switch>
          <Route path="/student-list">
            <StudentList />
          </Route>
          <Route path="/add-student">
            <AddStudent />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
