import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import RequestTable from './RequestTable';

const RequestList = props => (
  <div style={styles.container}>
    <Row>
      <Col lg="4">
        <h1 style={styles.headerTextStyle} className="request-title">Mathematics</h1>
        <RequestTable
          group="MATH"
          trequests={props.trequests}
          removeCheckedTrequest={props.removeCheckedTrequest}
        />
      </Col>
      <Col lg="4">
        <h1 style={styles.headerTextStyle} className="request-title">STEM/CTE</h1>
        <RequestTable
          group="STEM/CTE"
          trequests={props.trequests}
          removeCheckedTrequest={props.removeCheckedTrequest}
        />
      </Col>
      <Col lg="4">
        <h1 style={styles.headerTextStyle} className="request-title">Language Arts</h1>
        <RequestTable
          group="LA"
          trequests={props.trequests}
          removeCheckedTrequest={props.removeCheckedTrequest}
        />
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

RequestList.propTypes = {
  removeCheckedTrequest: PropTypes.func.isRequired,
  trequests: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default RequestList;
