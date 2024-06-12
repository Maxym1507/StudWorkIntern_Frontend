import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../api';
import './EmployerProfile.css';

interface JobPosting {
    jobPostingId: number;
    title: string;
    description: string;
    location: string;
    salary: number;
}

interface Internship {
    internshipId: number;
    title: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
}

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
    const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
    const [internships, setInternships] = useState<Internship[]>([]);

    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const response = await api.get(`/Employers/${id}`);
                setEmployer(response.data);
            } catch (error) {
                console.error('Error fetching employer data:', error);
            }
        };

        const fetchJobPostings = async () => {
            try {
                const response = await api.get(`/Employers/${id}/jobpostings`);
                setJobPostings(response.data);
            } catch (error) {
                console.error('Error fetching job postings:', error);
            }
        };

        const fetchInternships = async () => {
            try {
                const response = await api.get(`/Employers/${id}/internships`);
                setInternships(response.data);
            } catch (error) {
                console.error('Error fetching internships:', error);
            }
        };

        fetchEmployer();
        fetchJobPostings();
        fetchInternships();
    }, [id]);

    if (!employer) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employer-profile">
            <h1>Профіль роботодавця</h1>
            <p><strong>Назва компанії:</strong> {employer.companyName}</p>
            <p><strong>Контактна особа:</strong> {employer.contactName}</p>
            <p><strong>Email:</strong> {employer.contactEmail}</p>
            <p><strong>Телефон:</strong> {employer.contactPhoneNumber}</p>

            <Link to={`/employer/${id}/jobpostings/create`} className="btn">Створити вакансію</Link>
            <Link to={`/employer/${id}/internships/create`} className="btn">Створити стажування</Link>

            <h2>Вакансії роботодавця</h2>
            <ul>
                {jobPostings.length > 0 ? (
                    jobPostings.map((job) => (
                        <li key={job.jobPostingId}>
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                            <p><strong>Локація:</strong> {job.location}</p>
                            <p><strong>Зарплата:</strong> {job.salary}</p>
                        </li>
                    ))
                ) : (
                    <p>Немає доступних вакансій</p>
                )}
            </ul>

            <h2>Стажування роботодавця</h2>
            <ul>
                {internships.length > 0 ? (
                    internships.map((internship) => (
                        <li key={internship.internshipId}>
                            <h3>{internship.title}</h3>
                            <p>{internship.description}</p>
                            <p><strong>Локація:</strong> {internship.location}</p>
                            <p><strong>Початок:</strong> {new Date(internship.startDate).toLocaleDateString()}</p>
                            <p><strong>Кінець:</strong> {new Date(internship.endDate).toLocaleDateString()}</p>
                        </li>
                    ))
                ) : (
                    <p>Немає доступних стажувань</p>
                )}
            </ul>
        </div>
    );
};

export default EmployerProfile;
