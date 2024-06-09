import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import EmployerJobPostings from './EmployerJobPostings';
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

    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const response = await api.get(`/employers/${id}`);
                setEmployer(response.data);
            } catch (error) {
                console.error('Error fetching employer:', error);
            }
        };

        fetchEmployer();
    }, [id]);

    if (!employer) {
        return <div>Loading...</div>;
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
            <EmployerJobPostings employerId={employer.employerId} />
        </div>
    );
};

export default EmployerProfile;
