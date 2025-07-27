import React from 'react';
import { ButtonGroup,Button,Card } from 'react-bootstrap';
import ChatBox from './ChatBox';
import image from "../images/gluco.png";
import { Link } from 'react-router-dom';
import FAQSection from './FAQSection'; 
import { handleFindHospitals } from './QuickActions';
function DiabetesInfo() {
    const cards=[
        {
            title:"Types of Diabetes",
            desc:"Learn about Type 1, Type 2, Gestational,and Pre-diabetes.",
            path:"/subpages/types"
        },
        {
            title:"Symptoms & Diagnosis",
            desc:"Recognize warning signs and understand diagnostic tests.",
            path:"/subpages/symptoms"
        },
        {
        title:"Management and Lifestyle",
        desc:"Diet, exercise, medication, and continuous glucose monitoring",
        path:"/subpages/management"
        },

        {
            title:"Complications and Prevention",
            desc:"Prevent long-term health issues and maintain well-being.",
            path:"/subpages/prevention"
        },
    ];

    return(
         <div className="container py-4">
     <ButtonGroup className="mt-3 w-100 d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        <Button variant="dark" className="w-100 w-md-auto">
          <Link to="/components/DiabetesInfo" className="text-decoration-none text-white">Diabetes Info</Link>
        </Button>
        <Button variant="dark" className="w-100 w-md-auto">
          <Link to="/subpages/remedies" className="text-decoration-none text-white">Natural Remedies</Link>
        </Button>
        <Button variant="dark" className="w-100 w-md-auto" onClick={handleFindHospitals}>
          Find Hospital
        </Button>
      </ButtonGroup>

  <div className="row">
    {/* Left Column: Content */}
    <div className="col-12 col-lg-8 mb-4">
      <h2>Understanding Diabetes</h2>
      <p>
        Diabetes is the chronic disease that occurs either when the pancreas does not produce enough insulin
        or when the body cannot effectively use the insulin it produces...
        Insulin is the hormone that regulates blood sugar. Here you'll find essential information to help
        you understand and manage your condition.
      </p>

      <img
        src={image}
        className="img-fluid rounded mb-4"
        alt="glucometer"
        style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
      />

      <h4 className="fw-bold">Key Aspects of Diabetes</h4>
      <div className="row mt-3">
        {cards.map((card, idx) => (
          <div className="col-md-6 mb-3" key={idx}>
            <Link to={card.path} className="text-decoration-none text-white">
              <div className="card bg-dark text-white h-100 border border-secondary">
                <div className="card-body">
                  <h5 className="card-title text-success">{card.title}</h5>
                  <p className="card-text">{card.desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

    {/* Right Column: ChatBox */}
    <div className="col-12 col-lg-4 mb-4">
      <div className="bg-dark p-3 rounded shadow" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <ChatBox />
      </div>
    </div>
  </div>

  {/* FAQ Section */}
  <div className="mt-4">
    <FAQSection />
  </div>


    </div>   
    );
}

export default DiabetesInfo;