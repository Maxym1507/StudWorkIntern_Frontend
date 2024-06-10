import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import './EmployerInternshipsForm.css';

const EmployerInternshipsForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const employerId = Number(id);

    const [internship, setInternship] = useState({
        title: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
    });

    const [isEmployerValid, setIsEmployerValid] = useState(false);

    useEffect(() => {
        const checkEmployerExists = async () => {
            try {
                const response = await api.get(`/Employers/${employerId}`);
                if (response.status === 200) {
                    setIsEmployerValid(true);
                }
            } catch (error) {
                setIsEmployerValid(false);
            }
        };

        checkEmployerExists();
    }, [employerId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInternship((prevInternship) => ({
            ...prevInternship,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmployerValid) {
            alert('Invalid Employer ID. Please check the ID and try again.');
            return;
        }
        try {
            const response = await api.post('/Internships', {
                ...internship,
                employerId: employerId
            });
            alert('Інтернатура створена успішно!');
            console.log('Created internship:', response.data);
            // Clear form fields after successful submission
            setInternship({
                title: '',
                description: '',
                location: '',
                startDate: '',
                endDate: '',
            });
        } catch (error) {
            console.error('Error creating internship:', error);
            alert(`Сталася помилка при створенні інтернатури`);
        }
    };

    return (
        <div className="employer-internships-form">
            <h1>Створити інтернатуру</h1>
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
                <label>Дата початку:</label>
                <input
                    type="date"
                    name="startDate"
                    value={internship.startDate}
                    onChange={handleChange}
                    required
                />
                <label>Дата закінчення:</label>
                <input
                    type="date"
                    name="endDate"
                    value={internship.endDate}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={!isEmployerValid}>Створити</button>
            </form>
        </div>
    );
};

export default EmployerInternshipsForm;
