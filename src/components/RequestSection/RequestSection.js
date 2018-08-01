import React from 'react';
import { Row, Col } from 'reactstrap';
import RequestTable from './RequestTable';

const RequestSection = () => (
  <div className="request-header" style={styles.container}>
    <Row>
      <Col lg="4">
        <h1 style={styles.headerTextStyle} className="request-title">Mathematics</h1>
        <RequestTable group="MATH" />
      </Col>
      <Col lg="4">
        <h1 style={styles.headerTextStyle} className="request-title">STEM/CTE</h1>
        <RequestTable group="STEM/CTE" />
      </Col>
      <Col lg="4">
        <h1 style={styles.headerTextStyle} className="request-title">Language Arts</h1>
        <RequestTable group="LA" />
      </Col>
    </Row>

  </div>
);


const styles = {
  headerTextStyle: {
    fontSize: '2.7vw',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '8.6vh',
    marginBottom: '1vh'
  },

  container: {
    padding: '0 3vw 0 3vw'
  }
};

export default RequestSection;
