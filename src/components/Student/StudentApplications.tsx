import React, { useEffect, useState } from 'react';
import api from '../../api';
import './StudentApplications.css';

interface Application {
    applicationId: number;
    jobPostingId: number | null;
    internshipId: number | null;
    applicationDate: string;
}

interface Props {
    studentId: number;
}

const StudentApplications: React.FC<Props> = ({ studentId }) => {
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await api.get(`/students/${studentId}/applications`);
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, [studentId]);

    const applyForJob = async (jobPostingId: number) => {
        try {
            await api.post(`/applications`, {
                studentId,
                jobPostingId
            });
            alert('Заявка подана успішно!');
        } catch (error) {
            console.error('Error applying for job:', error);
        }
    };

    const applyForInternship = async (internshipId: number) => {
        try {
            await api.post(`/applications`, {
                studentId,
                internshipId
            });
            alert('Заявка подана успішно!');
        } catch (error) {
            console.error('Error applying for internship:', error);
        }
    };

    return (
        <div className="student-applications">
            <h2>Заявки студента</h2>
            <ul>
                {applications.map(application => (
                    <li key={application.applicationId}>
                        {application.jobPostingId ? `Вакансія: ${application.jobPostingId}` : `Стажування: ${application.internshipId}`}
                        (Дата подачі: {new Date(application.applicationDate).toLocaleDateString()})
                    </li>
                ))}
            </ul>
            {/* Приклад кнопок для подачі заявок */}
            <button onClick={() => applyForJob(1)}>Подати заявку на вакансію 1</button>
            <button onClick={() => applyForInternship(1)}>Подати заявку на стажування 1</button>
        </div>
    );
};

export default StudentApplications;
