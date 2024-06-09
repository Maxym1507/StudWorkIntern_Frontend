import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">StudWorkIntern</Link>
            </div>
            <div className="navbar-links">
                <Link to="/jobs">Вакансії</Link>
                <Link to="/internships">Стажування</Link>
                <Link to="/employer">Для роботодавців</Link>
            </div>
        </nav>
    );
};

export default Navbar;
