import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import EmployerJobPostings from './EmployerJobPostings';
import EmployerInternships from './EmployerInternships';
import './EmployerProfile.css';

interface Employer {
    employerId: number;
    companyName: string;
    contactName: string;
    contactEmail: string;
    contactPhoneNumber: string;
}

const EmployerProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [employer, setEmployer] = useState<Employer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const response = await api.get(`/employers/${id}`);
                setEmployer(response.data);
            } catch (error) {
                console.error('Error fetching employer:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployer();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!employer) {
        return (
            <div>
                <h1>Роботодавець не знайдений</h1>
                <Link to="/employers/create" className="btn">Створити роботодавця</Link>
            </div>
        );
    }

    return (
        <div className="employer-profile">
            <h1>Профіль роботодавця</h1>
            <div className="employer-info">
                <p>Назва компанії: {employer.companyName}</p>
                <p>Контактна особа: {employer.contactName}</p>
                <p>Email: {employer.contactEmail}</p>
                <p>Телефон: {employer.contactPhoneNumber}</p>
            </div>
            <div className="actions">
                <Link to={`/employer/${id}/jobpostings/create`} className="btn">Створити вакансію</Link>
                <Link to={`/employer/${id}/internships/create`} className="btn">Створити стажування</Link>
            </div>
            <EmployerJobPostings employerId={Number(id)} />
            <EmployerInternships employerId={Number(id)} />
        </div>
    );
};

export default EmployerProfile;
