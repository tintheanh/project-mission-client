import React from 'react';

const styles = {
  containerStyle: {
    margin: '0 12vw 14vh 12vw',
    position: 'relative',
    top: '13vh'
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
