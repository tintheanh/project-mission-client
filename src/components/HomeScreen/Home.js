import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import RequestForm from '../RequestSection/RequestForm';

const Home = props => (
  <div>
    <Header />
    <RequestForm
      addTrequest={props.addTrequest}
      subjects={props.subjects}
    />
  </div>
);

Home.propTypes = {
  addTrequest: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Home;
