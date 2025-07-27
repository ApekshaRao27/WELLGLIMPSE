import React from "react";
import dietimg from "../images/diet.png";
import meditateimg from "../images/meditate.png";
import workoutimg from "../images/workout.png";
import monitoringimg from "../images/monitoring.png"
import { ButtonGroup,Button,Card } from 'react-bootstrap';
import { handleFindHospitals } from '../components/QuickActions';
import { Link } from 'react-router-dom';
import DiabetesInfo from '../components/DiabetesInfo';
{/*import exerciseImg from "../images/exercise.png";
import dietImg from "../images/diet.png";
import monitorImg from "../images/monitor.png";
import stressImg from "../images/stress.png";*/}

export default function Management() {
  return (
    <div className="container py-4">

  <ButtonGroup className="mt-3 w-100 d-flex flex-wrap justify-content-center gap-2">
    <Button variant="dark">
      <Link to="/components/DiabetesInfo" className="text-decoration-none text-white">Diabetes Info</Link>
    </Button>
    <Button variant="dark">
      <Link to="/subpages/remedies" className="text-decoration-none text-white">Natural Remedies</Link>
    </Button>
    <Button variant="dark" onClick={handleFindHospitals}>Find Hospital</Button>
  </ButtonGroup>


  <div className="bg-dark text-white p-4 rounded text-center mb-3 mt-3">
    <h2>Management & Lifestyle</h2>
    <p className="lead">
      Empower your life with daily habits that help control and manage diabetes.
    </p>
  </div>

  
  <div className="bg-dark text-light p-4 rounded shadow mb-4 border-success border-4">
    <h4 className="text-center">Managing Diabetes Through Lifestyle</h4>
    <p>
      Managing diabetes isn’t just about taking medications — it’s about building healthy routines.
      From what you eat to how much you move and sleep, your daily habits play a critical role
      in blood sugar control and long-term health.
    </p>
  </div>

  {/* Healthy Eating Section */}
  <div className="row align-items-center mb-5">
    <div className="col-md-6 mb-3 mb-md-0">
      <img src={dietimg} alt="Healthy Diet" className="img-fluid rounded shadow" style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }} />
    </div>
    <div className="col-md-6">
      <h5 className="text-light">Healthy Eating Habits</h5>
      <ul className="text-light">
        <li>A diabetes-friendly diet emphasizes whole foods, vegetables, lean protein, and healthy fats while limiting added sugars and refined carbohydrates.</li>
        <li>Focus on portion control and consistent carb intake to maintain steady glucose levels.</li>
        <li>Skipping meals or overeating in one sitting can cause blood sugar fluctuations. Eat every 3–5 hours, and don’t skip breakfast.</li>
        <li>Reduce salt and processed foods.</li>
        <li>Drink 8+ glasses of water daily. Avoid sugary drinks and sodas.</li>
      </ul>
    </div>
  </div>


  <div className="row align-items-center flex-md-row-reverse mb-5">
    <div className="col-md-6 mb-3 mb-md-0">
      <img src={workoutimg} alt="Exercise" className="img-fluid rounded shadow" style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }} />
    </div>
    <div className="col-md-6">
      <h5 className="text-light">Physical Activity</h5>
      <ul className="text-light">
        <li>Aim for 30 minutes of moderate activity like walking, cycling, swimming, or yoga most days of the week.</li>
        <li>Physical activity helps your body use insulin more efficiently.</li>
        <li>Stay consistent and set a routine that fits your lifestyle.</li>
      </ul>
    </div>
  </div>


  <div className="row align-items-center mb-5">
    <div className="col-md-6 mb-3 mb-md-0">
      <img src={monitoringimg} alt="Blood Glucose Monitoring" className="img-fluid rounded shadow" style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }} />
    </div>
    <div className="col-md-6">
      <h5 className="text-light">Monitoring Blood Sugar</h5>
      <ul className="text-light">
        <li>Understand how food, activity, and stress affect your glucose.</li>
        <li>Adjust medication or insulin doses accurately.</li>
        <li>Prevent dangerous highs (hyperglycemia) or lows (hypoglycemia).</li>
        <li>Stay on track with your treatment goals.</li>
      </ul>
    </div>
  </div>

  
  <div className="row align-items-center flex-md-row-reverse mb-5">
    <div className="col-md-6 mb-3 mb-md-0">
      <img src={meditateimg} alt="Relaxing" className="img-fluid rounded shadow" style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }} />
    </div>
    <div className="col-md-6">
      <h5 className="text-light">Stress Management & Sleep</h5>
      <ul className="text-light">
        <li>Stress releases cortisol and adrenaline, raising blood sugar and reducing insulin efficiency.</li>
        <li>Practice mindfulness, follow a bedtime routine, and sleep 7–9 hours for balance and health.</li>
        <li>Poor sleep worsens blood sugar control — aim for consistent, restful nights.</li>
      </ul>
    </div>
  </div>

 
  <div className="text-white text-center p-4 rounded">
    <h5>Start small. Stay consistent. Stay healthy.</h5>
    <p>Good lifestyle habits are your strongest tool for managing diabetes every day.</p>
    <button className="btn btn-light">Explore More Tips</button>
  </div>
</div>

    
  );
}
