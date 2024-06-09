import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import StudentApplications from './StudentApplications';
import './StudentProfile.css';

interface Student {
    studentId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    resumeUrl: string;
}

const StudentProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [student, setStudent] = useState<Student | null>(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await api.get(`/students/${id}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="student-profile">
            <h1>Профіль студента</h1>
            <div className="student-info">
                <p>Ім'я: {student.firstName} {student.lastName}</p>
                <p>Email: {student.email}</p>
                <p>Телефон: {student.phoneNumber}</p>
                <p>Посилання на резюме: <a href={student.resumeUrl}>{student.resumeUrl}</a></p>
            </div>
            <StudentApplications studentId={student.studentId} />
        </div>
    );
};

export default StudentProfile;
