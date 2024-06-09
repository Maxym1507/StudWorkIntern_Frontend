import React, { useState } from 'react';
import api from '../../api';
import './EmployerForm.css';

const EmployerForm: React.FC = () => {
    const [employer, setEmployer] = useState({
        companyName: '',
        contactName: '',
        contactEmail: '',
        contactPhoneNumber: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployer({
            ...employer,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/employers', employer);
            alert('Роботодавець створений успішно!');
        } catch (error) {
            console.error('Error creating employer:', error);
        }
    };

    return (
        <div className="employer-form">
            <h1>Створити роботодавця</h1>
            <form onSubmit={handleSubmit}>
                <label>Назва компанії:</label>
                <input type="text" name="companyName" value={employer.companyName} onChange={handleChange} required />
                <label>Контактна особа:</label>
                <input type="text" name="contactName" value={employer.contactName} onChange={handleChange} required />
                <label>Email:</label>
                <input type="email" name="contactEmail" value={employer.contactEmail} onChange={handleChange} required />
                <label>Телефон:</label>
                <input type="tel" name="contactPhoneNumber" value={employer.contactPhoneNumber} onChange={handleChange} required />
                <button type="submit">Створити</button>
            </form>
        </div>
    );
};

export default EmployerForm;
