import React, { useEffect, useState } from 'react';
import api from '../../api';
import './JobList.css';

interface JobPosting {
    jobPostingId: number;
    title: string;
    companyName: string;
    location: string;
    salary: number;
}

const JobList: React.FC = () => {
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await api.get('/jobpostings');
                setJobPostings(response.data);
            } catch (error) {
                console.error('Error fetching job postings:', error);
            }
        };

        fetchJobPostings();
    }, []);

    return (
        <div className="job-list">
            <h1>Список вакансій</h1>
            <ul>
                {jobPostings.map(jobPosting => (
                    <li key={jobPosting.jobPostingId}>
                        <h3>{jobPosting.title}</h3>
                        <p>Компанія: {jobPosting.companyName}</p>
                        <p>Локація: {jobPosting.location}</p>
                        <p>Зарплата: {jobPosting.salary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
