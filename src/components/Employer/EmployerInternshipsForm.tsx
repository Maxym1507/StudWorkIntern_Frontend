import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import './EmployerInternshipsForm.css';

const EmployerInternshipsForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const employerId = Number(id);

    const [internship, setInternship] = useState({
        title: '',
        description: '',
        location: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInternship((prevInternship) => ({
            ...prevInternship,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post(``, internship);
            alert('Стажування створено успішно!');
        } catch (error) {
            console.error('Error creating internship:', error);
            alert('Сталася помилка при створенні стажування');
        }
    };

    return (
        <div className="employer-internships-form">
            <h1>Створити стажування</h1>
            <form onSubmit={handleSubmit}>
                <label>Назва:</label>
                <input
                    type="text"
                    name="title"
                    value={internship.title}
                    onChange={handleChange}
                    required
                />
                <label>Опис:</label>
                <input
                    type="text"
                    name="description"
                    value={internship.description}
                    onChange={handleChange}
                    required
                />
                <label>Локація:</label>
                <input
                    type="text"
                    name="location"
                    value={internship.location}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Створити</button>
            </form>
        </div>
    );
};

export default EmployerInternshipsForm;
