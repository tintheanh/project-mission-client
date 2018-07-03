import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.active !== this.state.active;
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const {
      submitBtnRef,
      subject,
      group,
      inputSubject
    } = this.props;
    const { active } = this.state;

    // This will detect every clicking out of the div, even on the submit button
    // => Making the user's input empty, needs to detect when the user click on the submit button
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && active) {
      this.setState({ active: false }, () => {
        // When clicking out the submit button, submit the input
        if (submitBtnRef.contains(event.target)) inputSubject(subject, group);
        else inputSubject('', '');
      });
    }
  }

  render() {
    const {
      subject,
      group,
      inputSubject
    } = this.props;
    const { active } = this.state;
    return (
      active ? (
        <div
          style={styles.chipStyleActive}
          ref={this.setWrapperRef}
          onClick={() => {
            this.setState(prevState => ({ active: !prevState.active }));
            if (!active) inputSubject(subject, group); // When button is selected => input in
            else inputSubject('', ''); // Button is unselected => earase input
          }
          }
        >
          <p style={styles.textStyle}>{this.props.subject}</p>
        </div>
      ) : (
        <div
          style={styles.chipStyleInactive}
          ref={this.setWrapperRef}
          onClick={() => {
            this.setState(prevState => ({ active: !prevState.active }));
            if (!active) inputSubject(subject, group);
            else inputSubject('', '');
          }
          }
        >
          <p style={styles.textStyle}>{this.props.subject}</p>
        </div>
      )
    );
  }
}

const styles = {
  chipStyleInactive: {
    width: '40%',
    borderTop: '1px solid rgba(0, 0, 0, 0.16)',
    borderRadius: '25px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)',
    margin: '12px',
    cursor: 'pointer'
  },

  chipStyleActive: {
    width: '40%',
    borderRadius: '25px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.16)',
    background: '#90DEFF',
    margin: '12px',
    cursor: 'pointer'
  },

  textStyle: {
    padding: '1vh 0 1vh 0',
    fontSize: '1vw',
    margin: '0'
  }
};

Subject.propTypes = {
  submitBtnRef: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  subject: PropTypes.string.isRequired,
  group: PropTypes.string.isRequired,
  inputSubject: PropTypes.func.isRequired
};
