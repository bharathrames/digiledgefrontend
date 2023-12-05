import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/students">Students List</Link></li>
        <li><Link to="/add-student">Add Student</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
