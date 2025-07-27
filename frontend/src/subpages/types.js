import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup,Button,Card ,Row,Col} from 'react-bootstrap';
import { handleFindHospitals } from '../components/QuickActions';
import DiabetesInfo from '../components/DiabetesInfo';
export default function Types() {

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

  <div className="text-center mb-5 mt-4">
    <h2 className="text-success fw-bold display-5">Types of Diabetes</h2>
    <p className="lead text-light">
      Explore the key characteristics and differences between each type of diabetes.
    </p>
  </div>

  <Row xs={1} md={2} className="g-4">
    <Col>
      <div className="bg-dark text-light p-4 rounded shadow-sm border border-secondary h-100">
        <h4 className="text-success">Type 2 Diabetes</h4>
        <p>
          Type 2 diabetes is the most common form of diabetes, accounting for the vast majority of
          cases worldwide. It occurs when the body becomes resistant to insulin or doesn't produce
          enough of it to maintain normal glucose levels. It’s often linked to lifestyle factors.
        </p>
      </div>
    </Col>

    <Col>
      <div className="bg-dark text-light p-4 rounded shadow-sm border border-secondary h-100">
        <h4 className="text-success">Prediabetes</h4>
        <p>
          Prediabetes means blood sugar levels are higher than normal but not high enough to be
          classified as Type 2 diabetes. It can often be reversed with early lifestyle changes.
        </p>
      </div>
    </Col>

    <Col>
      <div className="bg-dark text-light p-4 rounded shadow-sm border border-secondary h-100">
        <h4 className="text-success">Type 1 Diabetes</h4>
        <p>
          Type 1 diabetes is an autoimmune condition where the body attacks insulin-producing cells.
          It usually develops in children or young adults and requires lifelong insulin therapy.
        </p>
      </div>
    </Col>

    <Col>
      <div className="bg-dark text-light p-4 rounded shadow-sm border border-secondary h-100">
        <h4 className="text-success">Gestational Diabetes</h4>
        <p>
          Gestational diabetes appears during pregnancy and usually resolves after delivery. However,
          it increases the risk of developing Type 2 diabetes later in life.
        </p>
      </div>
    </Col>
  </Row>

  <div className="bg-dark text-white p-4 rounded mt-4 text-center shadow-sm">
    <h5>Want to Know about Symptoms?</h5>
    <Link to="/subpages/symptoms" className="text-decoration-none text-success">Click Here</Link>
  </div>
</div>

  );
}
