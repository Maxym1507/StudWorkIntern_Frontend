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
        salary: 0,
        expirationDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setJobPosting((prevJobPosting) => ({
            ...prevJobPosting,
            [name]: name === 'salary' ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(``, jobPosting);
            alert('Вакансія створена успішно!');
        } catch (error) {
            console.error('Error creating job posting:', error);
            alert('Сталася помилка при створенні вакансії');
        }
    };

    return (
        <div className="employer-job-postings-form">
            <h1>Створити вакансію</h1>
            <form onSubmit={handleSubmit}>
                <label>Назва:</label>
                <input
                    type="text"
                    name="title"
                    value={jobPosting.title}
                    onChange={handleChange}
                    required
                />
                <label>Опис:</label>
                <input
                    type="text"
                    name="description"
                    value={jobPosting.description}
                    onChange={handleChange}
                    required
                />
                <label>Локація:</label>
                <input
                    type="text"
                    name="location"
                    value={jobPosting.location}
                    onChange={handleChange}
                    required
                />
                <label>Зарплата:</label>
                <input
                    type="number"
                    name="salary"
                    value={jobPosting.salary}
                    onChange={handleChange}
                    required
                />
                <label>Дата закінчення терміну дії:</label>
                <input
                    type="date"
                    name="expirationDate"
                    value={jobPosting.expirationDate}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Створити</button>
            </form>
        </div>
    );
};

export default EmployerJobPostingsForm;
