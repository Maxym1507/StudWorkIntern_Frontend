import React, { useState, useEffect } from 'react';
import api from '../../api';
import './JobList.css';

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState([]);
    const [studentId, setStudentId] = useState<number>(1); // Replace with actual student ID logic

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await api.get('/JobPostings');
            setJobs(response.data);
        };
        fetchJobs();
    }, []);

    const handleApply = async (jobId: number) => {
        try {
            const application = {
                studentId,
                jobPostingId: jobId,
                applicationDate: new Date().toISOString()
            };
            await api.post('/Applications', application);
            alert('Ви успішно подали заявку на вакансію!');
        } catch (error) {
            console.error('Error applying for job:', error);
            alert('Сталася помилка при подачі заявки на вакансію.');
        }
    };

    return (
        <div className="job-list">
            <h1>Вакансії</h1>
            <ul>
                {jobs.map((job: any) => (
                    <li key={job.jobPostingId}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>{job.location}</p>
                        <p>Зарплата: {job.salary}</p>
                        <button onClick={() => handleApply(job.jobPostingId)}>Подати заявку</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
