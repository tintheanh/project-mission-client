import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Header from './Header';
import RequestForm from '../RequestSection/RequestForm';

const Home = props => (
  <div>
    <Header />
    <RequestForm
      subjects={props.subjects}
    />
    <footer style={styles.footerStyle}>{`© ${moment().year()} Anh Nguyen ・ Nguyen Dinh ・ Nhat Trinh`}</footer>
  </div>
);

const styles = {
  footerStyle: {
    width: '100%',
    paddingTop: '8px',
    paddingBottom: '8px',
    position: 'absolute',
    bottom: '0',
    color: '#7F7E7E',
    textAlign: 'center',
    background: '#464646'
  }
};

Home.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Home;
