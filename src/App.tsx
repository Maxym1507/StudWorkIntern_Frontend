import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import StudentProfile from './components/Student/StudentProfile';
import StudentProfileForm from './components/Student/StudentProfileForm';
import EmployerProfile from './components/Employer/EmployerProfile';
import EmployerJobPostingsForm from './components/Employer/EmployerJobPostingsForm';
import EmployerInternshipsForm from './components/Employer/EmployerInternshipsForm';
import EmployersList from './components/Employer/EmployersList';
import EmployerForm from './components/Employer/EmployerForm';
import JobList from './components/Jobs/JobList';
import InternshipList from './components/Internships/InternshipList';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import './styles/Common.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/:id" element={<StudentProfile />} />
          <Route path="/student/create" element={<StudentProfileForm />} />
          <Route path="/employer/:id" element={<EmployerProfile />} />
          <Route path="/employer/:id/jobpostings/create" element={<EmployerJobPostingsForm />} />
          <Route path="/employer/:id/internships/create" element={<EmployerInternshipsForm />} />
          <Route path="/employers" element={<EmployersList />} />
          <Route path="/employers/create" element={<EmployerForm />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/internships" element={<InternshipList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
