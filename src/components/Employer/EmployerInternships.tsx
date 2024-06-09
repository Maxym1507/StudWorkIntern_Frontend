import React, { useEffect, useState } from 'react';
import api from '../../api';
import './EmployerInternships.css';

interface Internship {
    internshipId: number;
    title: string;
    description: string;
}

interface Props {
    employerId: number;
}

const EmployerInternships: React.FC<Props> = ({ employerId }) => {
    const [internships, setInternships] = useState<Internship[]>([]);

    useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await api.get(``);
                setInternships(response.data);
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        };

        fetchInternships();
    }, [employerId]);

    return (
        <div className="employer-internships">
            <h2>Стажування роботодавця</h2>
            <ul>
                {internships.map(internship => (
                    <li key={internship.internshipId}>
                        <h3>{internship.title}</h3>
                        <p>{internship.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployerInternships;
