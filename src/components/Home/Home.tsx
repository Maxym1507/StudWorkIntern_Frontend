import React from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Slider />
            <div className="home-sections">
                <div className="home-section">
                    <h2>Знайти роботу</h2>
                    <p>Знайдіть найкращі вакансії для себе.</p>
                    <Link to="/jobs" className="btn">Переглянути вакансії</Link>
                </div>
                <div className="home-section">
                    <h2>Знайти стажування</h2>
                    <p>Відкрийте нові можливості для стажування.</p>
                    <Link to="/internships" className="btn">Переглянути стажування</Link>
                </div>
                <div className="home-section">
                    <h2>Для роботодавців</h2>
                    <p>Знайдіть талановитих працівників для вашої компанії.</p>
                    <Link to="/employers" className="btn">Дізнатись більше</Link>
                </div>
                <div className="home-section">
                    <h2>Створити профіль студента</h2>
                    <p>Створіть новий профіль студента.</p>
                    <Link to="/student/create" className="btn">Створити профіль</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
