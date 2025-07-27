import React from "react";
import {handleFindHospitals} from "../components/QuickActions";
import { ButtonGroup,Button,Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import DiabetesInfo from '../components/DiabetesInfo';
export default function Symptoms() {
  
       
  return (
    <div className="container py-4">
      {/* Page Header */}
            <ButtonGroup className="mt-3 w-100 d-flex flex-wrap justify-content-center gap-2">
              <Button variant="dark">
                <Link to="/components/DiabetesInfo" className="text-decoration-none text-white">Diabetes Info</Link>
              </Button>
              <Button variant="dark">
                <Link to="/subpages/remedies" className="text-decoration-none text-white">Natural Remedies</Link>
              </Button>
              <Button variant="dark" onClick={handleFindHospitals}>Find Hospital</Button>
            </ButtonGroup>
      <div className="text-center text-md-start mb-4">
    <h2 className="text-white fw-bold fs-3">Symptoms & Diagnosis</h2>
    <p className="lead text-light fs-6">
      Early signs of diabetes can be subtle. Identifying them early can make a huge difference.
    </p>
  </div>

  {/* Info Card 1 */}
  <div className="bg-dark text-light p-4 rounded shadow mb-3">
    <p>
      Diabetes can develop gradually, and early symptoms are often easy to miss or attribute to other causes. However, recognizing these signs early is crucial for timely diagnosis and effective management. While symptoms can vary between individuals and types of diabetes, there are several common indicators to watch out for.
    </p>
  </div>

  {/* Info Card 2 */}
  <div className="bg-dark text-light p-4 rounded shadow mb-3">
    <h3 className="fs-5">General Symptoms</h3>
    <ul>
      <li>
        One of the most noticeable early symptoms is increased thirst, known as polydipsia, often accompanied by frequent urination (polyuria). This happens because excess sugar in the blood causes the kidneys to work overtime to filter and remove it, leading to dehydration.
      </li>
      <li>
        Fatigue is also a frequent complaint, as the body struggles to use glucose effectively for energy.
      </li>
      <li>
        Blurred vision may occur when high blood sugar causes fluid to shift in the eyes, affecting focus. In some cases, people may also experience increased hunger, dry mouth, and headaches.
      </li>
    </ul>
  </div>

  {/* Info Paragraph */}
  <div className="bg-dark text-light p-4 rounded shadow mb-3">
    <p>
      As diabetes progresses, symptoms may become more serious. People may notice slow healing of cuts or wounds, frequent infections (especially in the skin or gums), or tingling and numbness in the hands and feet due to nerve damage (neuropathy). In Type 1 diabetes, sudden weight loss can occur even with regular eating, as the body begins breaking down fat and muscle for energy.
    </p>
  </div>

  {/* CTA - When to See Doctor */}
  <div className="bg-info text-dark p-4 rounded mt-4 shadow text-center text-md-start">
    <h5 className="fw-bold fs-5">When to See a Doctor</h5>
    <p>
      If you experience multiple symptoms—particularly increased thirst, frequent urination, unexplained fatigue, or vision changes—it’s important to speak with a healthcare professional. Early detection allows for better long-term outcomes and may prevent serious complications.
    </p>
    <button className="btn btn-danger w-100 w-md-auto" onClick={handleFindHospitals}>Find Hospital</button>
  </div>

  {/* CTA - Assessment */}
  <div className="bg-dark text-white p-4 rounded mt-3 text-center shadow-sm">
    <h5>Not sure if your symptoms are diabetes?</h5>
    <p>Take our quick assessment or consult a healthcare professional today.</p>
    <button className="btn btn-danger w-100 w-md-auto">Start Assessment</button>
  </div>
    </div>
  );
}

