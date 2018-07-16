import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import RequestForm from '../RequestSection/RequestForm';

const Home = props => (
  <div>
    <Header />
    <RequestForm
      subjects={props.subjects}
    />
  </div>
);

Home.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Home;
