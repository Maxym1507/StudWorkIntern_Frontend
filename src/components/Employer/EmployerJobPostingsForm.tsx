import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import './EmployerJobPostingsForm.css';

const EmployerJobPostingsForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const employerId = Number(id);

    const [jobPosting, setJobPosting] = useState({
        title: '',
        description: '',
        location: '',
        salary: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setJobPosting({
            ...jobPosting,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(`/employers/${employerId}/jobpostings`, jobPosting);
            alert('Вакансія створена успішно!');
        } catch (error) {
            console.error('Error creating job posting:', error);
        }
    };

    return (
        <div className="employer-job-postings-form">
            <h1>Створити вакансію</h1>
            <form onSubmit={handleSubmit}>
                <label>Назва:</label>
                <input type="text" name="title" value={jobPosting.title} onChange={handleChange} required />
                <label>Опис:</label>
                <input type="text" name="description" value={jobPosting.description} onChange={handleChange} required />
                <label>Локація:</label>
                <input type="text" name="location" value={jobPosting.location} onChange={handleChange} required />
                <label>Зарплата:</label>
                <input type="number" name="salary" value={jobPosting.salary} onChange={handleChange} required />
                <button type="submit">Створити</button>
            </form>
        </div>
    );
};

export default EmployerJobPostingsForm;
