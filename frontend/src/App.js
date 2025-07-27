import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import DiabetesInfo from './components/DiabetesInfo';
import Types from './subpages/types';
import FAQSection from './components/FAQSection'; 
import Symptoms from './subpages/symptoms';
import Management from './subpages/management';
import Complications from './subpages/prevention';
import Remedy from './subpages/remedies';
import Home from './Home';
import Login from './components/Login';
import Register from './Register';
import UploadReport from "./pages/UploadReport";
import EmailPage from './pages/emailpage';
import ResetPasswordPage from './pages/passwordpage';
import Step1Questionnaire from './Step1Questionnaire';
import Step2Result from './Step2Result';
function App() {
  const location = useLocation();   //this one is to hide header in login and register page 
  const hideHeaderPaths = ['/', '/register','/forgot-password','/reset-password/:token'];

  return (
   
    <div className="bg-dark text-light min-vh-100 p-3">
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/components/DiabetesInfo" element={<DiabetesInfo />} />
        <Route path="/subpages/types" element={<Types />} />
        <Route path="/subpages/symptoms" element={<Symptoms />} />
        <Route path="/subpages/management" element={<Management />} />
        <Route path="/subpages/prevention" element={<Complications />} />
        <Route path="/subpages/remedies" element={<Remedy />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/pages/UploadReport' element={<UploadReport />} />
        <Route path='/forgot-password' element={<EmailPage />} />
        <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        <Route path="/Step1Questionnaire" element={<Step1Questionnaire />} />
        <Route path="/Step2Result" element={<Step2Result />} />
      </Routes>
    </div>
  );
}

export default App;
