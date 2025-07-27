import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { ButtonGroup,Button} from 'react-bootstrap';
import { handleFindHospitals } from '../components/QuickActions';
import { Link } from 'react-router-dom';
import DiabetesInfo from '../components/DiabetesInfo';
export default function Remedy(){
    const remedies = [
    {
      title: "Cinnamon",
      desc: "May help improve insulin sensitivity. Best used in moderation.",
      tip: "Too much may affect liver health.",
      
    },
    {
      title: "Fenugreek Seeds",
      desc: "Contain soluble fiber which may lower blood sugar.",
      tip: "Soak overnight and consume in the morning.",
      
    
    },
    {
      title: "Bitter Gourd",
      desc: "Has blood-glucose-lowering effects due to active compounds.",
      tip: "Can be consumed as juice or cooked.",
      
      
    },
    {
      title: "Aloe Vera",
      desc: "May help reduce fasting blood glucose levels.",
      tip: "Use fresh and consume in limited amounts.",
     
     
    },
    {
      title: "Exercise & Yoga",
      desc: "Physical activity improves insulin response.",
      tip: "Practice daily. Yoga helps stress too.",
   
     
    },
    {
      title: "Turmeric",
      desc: "Curcumin in turmeric has anti-inflammatory effects.",
      tip: "Pair with black pepper for better absorption.",
   
     
    },
    {
       title:"Amla" ,
       desc:"It helps the pancreas keep blood sugar at a healthy level.",
       tip:"Can be eaten on an empty  stomach"
    },
     {
       title:"Sunlight" ,
       desc:"Insulin synthesis depends on sunlight",
       tip:"Spend atleast 30  minutes daily in the sunlight"
    }
  ];
    return(
 <Container className="py-5">
  {/* Responsive Button Group */}
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

  {/* Headings */}
  <h2 className="text-center display-5 fw-bold mb-3 text-white mt-4">
    Natural Remedies for Diabetes
  </h2>
  <p className="text-center text-light mb-4 px-2">
    Explore evidence-backed natural methods that may support healthy blood sugar levels with care and guidance.
  </p>

  {/* Responsive Cards Grid */}
  <Row className="row-cols-1 row-cols-md-2 g-4">
    {remedies.map((item, idx) => (
      <Col key={idx}>
        <Card className="h-100 bg-dark text-white shadow-sm">
          <Card.Body>
            <Card.Title>{item.icon} {item.title}</Card.Title>
            <Card.Text>{item.desc}</Card.Text>
            <small className="text-success">{item.tip}</small>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>

  {/* Info Note */}
  <div className="bg-dark text-white p-4 rounded mt-5 text-center shadow-sm">
    <h5>Always Talk to Your Doctor</h5>
    <p>
      These remedies support your treatment; they are not substitutes. Consult a healthcare professional before trying anything new.
    </p>
  </div>
</Container>

    )
}