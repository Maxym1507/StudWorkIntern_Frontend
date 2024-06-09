import React, { useState } from 'react';
import api from '../../api';
import './StudentProfileForm.css';

const StudentProfileForm: React.FC = () => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        resumeUrl: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/students', student);
            alert('Профіль створено успішно!');
        } catch (error) {
            console.error('Error creating student profile:', error);
        }
    };

    return (
        <div className="student-profile-form">
            <h1>Створити профіль студента</h1>
            <form onSubmit={handleSubmit}>
                <label>Ім'я:</label>
                <input type="text" name="firstName" value={student.firstName} onChange={handleChange} required />
                <label>Прізвище:</label>
                <input type="text" name="lastName" value={student.lastName} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="email" value={student.email} onChange={handleChange} required />
                <label>Телефон:</label>
                <input type="tel" name="phoneNumber" value={student.phoneNumber} onChange={handleChange} required />
                <label>Посилання на резюме:</label>
                <input type="url" name="resumeUrl" value={student.resumeUrl} onChange={handleChange} required />
                <button type="submit">Створити</button>
            </form>
        </div>
    );
};

export default StudentProfileForm;
