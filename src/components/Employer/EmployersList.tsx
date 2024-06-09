import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './EmployersList.css';

interface Employer {
    employerId: number;
    companyName: string;
}

const EmployersList: React.FC = () => {
    const [employers, setEmployers] = useState<Employer[]>([]);

    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await api.get('/employers');
                setEmployers(response.data);
            } catch (error) {
                console.error('Error fetching employers:', error);
            }
        };

        fetchEmployers();
    }, []);

    return (
        <div className="employers-list">
            <h1>Список роботодавців</h1>
            <ul>
                {employers.map(employer => (
                    <li key={employer.employerId}>
                        <Link to={`/employer/${employer.employerId}`}>{employer.companyName}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/employers/create" className="btn">Створити роботодавця</Link>
        </div>
    );
};

export default EmployersList;
