import Accordion from "react-bootstrap/Accordion";

function FAQSection() {
  return (
    <div className="mt-2">
      <h4 className="fw-bold mb-4">Frequently Asked Questions</h4>
      <div className="container">
      <Accordion defaultActiveKey={null} alwaysOpen className="faq-dark">
        <Accordion.Item eventKey="0">
          <Accordion.Header>What are the early symptoms of diabetes?</Accordion.Header>
          <Accordion.Body>
            Common symptoms include increased thirst, frequent urination, fatigue, and blurred vision.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>How can diet help manage diabetes?</Accordion.Header>
          <Accordion.Body>
            A healthy diet helps control blood sugar levels and prevents complications. Focus on fiber-rich, low-sugar, low-fat foods.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>
            What is the difference between Type 1 and Type 2 diabetes?
          </Accordion.Header>
          <Accordion.Body>
            Type 1 is autoimmune and typically develops early. Type 2 is often lifestyle-related and develops gradually.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>How often should I monitor my blood sugar?</Accordion.Header>
          <Accordion.Body>
            It depends on your treatment plan, but most people check multiple times a day. Always follow your doctor’s advice.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
          <Accordion.Header>Can exercise help prevent or manage diabetes?</Accordion.Header>
          <Accordion.Body>
            Yes! Regular physical activity improves insulin sensitivity and lowers blood sugar levels.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </div>
    </div>
  );
}

export default FAQSection;