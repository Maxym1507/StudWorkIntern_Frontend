import React, { useEffect, useState } from 'react';
import api from '../../api';
import './InternshipList.css';

interface Internship {
    internshipId: number;
    title: string;
    companyName: string;
    location: string;
}

const InternshipList: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>([]);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await api.get('/internships');
                setInternships(response.data);
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        };

        fetchInternships();
    }, []);

    return (
        <div className="internship-list">
            <h1>Список стажувань</h1>
            <ul>
                {internships.map(internship => (
                    <li key={internship.internshipId}>
                        <h3>{internship.title}</h3>
                        <p>Компанія: {internship.companyName}</p>
                        <p>Локація: {internship.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InternshipList;
