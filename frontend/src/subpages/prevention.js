import React from "react";
import { ButtonGroup,Button,Card } from 'react-bootstrap';
import { handleFindHospitals } from '../components/QuickActions';
import { Link } from 'react-router-dom';
import DiabetesInfo from '../components/DiabetesInfo';
function Complications() {
  return (
    <div className="container py-4">
      {/* Header */}
         <ButtonGroup className="mt-3 w-100 d-flex flex-wrap justify-content-center gap-2">
           <Button variant="dark">
             <Link to="/components/DiabetesInfo" className="text-decoration-none text-white">Diabetes Info</Link>
           </Button>
           <Button variant="dark">
             <Link to="/subpages/remedies" className="text-decoration-none text-white">Natural Remedies</Link>
           </Button>
           <Button variant="dark" onClick={handleFindHospitals}>Find Hospital</Button>
         </ButtonGroup>
     <div className="bg-dark text-white p-4 rounded text-center mb-4">
    <h2>Complications & Prevention</h2>
    <p className="lead">Learn about potential complications and how to prevent them effectively.</p>
  </div>

  {/* Complications Section */}
  <h4 className="text-lead mb-3 text-white">Common Complications</h4>
  <ul className="list-group mb-4">
    <li className="list-group-item bg-dark text-white">
      <strong>Nerve Damage (Neuropathy):</strong> Tingling, pain or numbness, especially in hands and feet.
    </li>
    <li className="list-group-item bg-dark text-white">
      <strong>Eye Damage (Retinopathy):</strong> Vision issues caused by damaged blood vessels in the eye.
    </li>
    <li className="list-group-item bg-dark text-white">
      <strong>Heart Disease:</strong> Increases risk of heart attacks, strokes, and high blood pressure.
    </li>
    <li className="list-group-item bg-dark text-white">
      <strong>Kidney Disease (Nephropathy):</strong> Can lead to kidney failure if not managed properly.
    </li>
    <li className="list-group-item bg-dark text-white">
      <strong>Foot Problems:</strong> Poor circulation and nerve damage may lead to infections or ulcers.
    </li>
    <li className="list-group-item bg-dark text-white">
      <strong>Gum Disease:</strong> High sugar levels increase the risk of oral health problems.
    </li>
  </ul>

  {/* Prevention Tips Section */}
  <h4 className="text-lead mb-3 text-white">Prevention Tips</h4>
  <div className="row row-cols-1 row-cols-md-2 g-4">
    <div className="col">
      <div className="card h-100 bg-dark text-white">
        <div className="card-body">
          <h5 className="card-title">Healthy Eating</h5>
          <p className="card-text">
            Eat fiber-rich foods, reduce sugar intake, and follow a balanced meal plan.
          </p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 bg-dark text-white">
        <div className="card-body">
          <h5 className="card-title">Regular Exercise</h5>
          <p className="card-text">
            Aim for 30 minutes of activity daily to improve insulin use and overall health.
          </p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 bg-dark text-white">
        <div className="card-body">
          <h5 className="card-title">Monitor Blood Sugar</h5>
          <p className="card-text">
            Track levels regularly and follow your doctor's advice to avoid fluctuations.
          </p>
        </div>
      </div>
    </div>

    <div className="col">
      <div className="card h-100 bg-dark text-white">
        <div className="card-body">
          <h5 className="card-title">Manage Stress & Sleep</h5>
          <p className="card-text">
            Reduce stress with relaxation techniques and get 7–9 hours of quality sleep.
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Footer CTA */}
  <div className="bg-dark text-white text-center mt-5 p-4 rounded shadow-sm">
    <h5>Take control of your health today!</h5>
    <p>Preventing complications starts with daily habits and regular checkups.</p>
  </div>
    </div>
  );
}

export default Complications;
