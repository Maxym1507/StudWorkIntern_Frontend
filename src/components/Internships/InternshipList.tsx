import React, { useState, useEffect } from 'react';
import api from '../../api';
import './InternshipList.css';

const InternshipList: React.FC = () => {
    const [internships, setInternships] = useState([]);
    const [studentId, setStudentId] = useState<number>(1); // Replace with actual student ID logic

    useEffect(() => {
        const fetchInternships = async () => {
            const response = await api.get('/Internships');
            setInternships(response.data);
        };
        fetchInternships();
    }, []);

    const handleApply = async (internshipId: number) => {
        try {
            const application = {
                studentId,
                internshipId,
                applicationDate: new Date().toISOString()
            };
            await api.post('/Applications', application);
            alert('Ви успішно подали заявку на стажування!');
        } catch (error) {
            console.error('Error applying for internship:', error);
            alert('Сталася помилка при подачі заявки на стажування.');
        }
    };

    return (
        <div className="internship-list">
            <h1>Стажування</h1>
            <ul>
                {internships.map((internship: any) => (
                    <li key={internship.internshipId}>
                        <h2>{internship.title}</h2>
                        <p>{internship.description}</p>
                        <p>{internship.location}</p>
                        <p>Початок: {internship.startDate}</p>
                        <p>Кінець: {internship.endDate}</p>
                        <button onClick={() => handleApply(internship.internshipId)}>Подати заявку</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InternshipList;
