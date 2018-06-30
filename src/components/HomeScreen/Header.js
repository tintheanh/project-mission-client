import React from 'react';

const styles = {
  containerStyle: {
    margin: '13vh 12vw 0 12vw'
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: '5vw',
    color: '#fff',
    textShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)',
    textAlign: 'center'
  }
};

const Header = () => (
  <header style={styles.containerStyle}>
    <h1 style={styles.headerTextStyle}>Welcome to Mission College Tutoring Center</h1>
  </header>
);

export default Header;
