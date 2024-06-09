import React, { useEffect, useState } from 'react';
import api from '../../api';
import './EmployerJobPostings.css';

interface JobPosting {
    jobPostingId: number;
    title: string;
    description: string;
}

interface Props {
    employerId: number;
}

const EmployerJobPostings: React.FC<Props> = ({ employerId }) => {
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);

    useEffect(() => {
        const fetchJobPostings = async () => {
            try {
                const response = await api.get(``);
                setJobPostings(response.data);
            } catch (error) {
                console.error('Error fetching job postings:', error);
            }
        };

        fetchJobPostings();
    }, [employerId]);

    return (
        <div className="employer-job-postings">
            <h2>Вакансії роботодавця</h2>
            <ul>
                {jobPostings.map(jobPosting => (
                    <li key={jobPosting.jobPostingId}>
                        {jobPosting.title}
                        <p>{jobPosting.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployerJobPostings;
