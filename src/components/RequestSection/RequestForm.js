import React, { Component } from 'react';
import fire from 'firebase';
import moment from 'moment';
import {
  Container, Row, Col, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import PropTypes from 'prop-types';
import Subject from '../HomeScreen/Subject';

export default class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.ninputRef = React.createRef();
    this.state = {
      tinput: '',
      ninput: '',
      ginput: '',
      submitBtnRef: '',
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate(_, nextState) {
    return nextState.modal !== this.state.modal || nextState.submitBtnRef !== this.state.submitBtnRef;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.tinput !== '') {
      const trequestsRef = fire.database().ref('trequests');
      const data = {
        name: this.state.ninput,
        subject: this.state.tinput,
        checked: false,
        byTutor: '',
        group: this.state.ginput,
        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
        dateChecked: ''
      };
      trequestsRef.push(data);
      const sound = document.getElementById('audio');
      sound.play();
      this.ninputRef.value = '';
      alert('Your request has been submitted! Please wait for the next available tutor!');
      this.toggle();
      this.setState({ ninput: '' });
    } else {
      alert('Please select one course!');
    }
  }

  returnSubjectGroup(subjects, group) {
    const subjectGroup = [];
    subjects.forEach((e) => {
      if (e.group === group) {
        subjectGroup.push(e);
      }
    });
    return subjectGroup;
  }

  toggle() {
    if (this.state.ninput === '') {
      alert('Please enter your name!');
    } else if (this.state.ninput.length > 9) {
      alert('Name must not more than 10 characters!');
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal,
        tinput: '',
        ginput: '',
        submitBtnRef: ''
      }));
    }
  }

  inputSubject(subject, group) {
    this.setState({ tinput: subject, ginput: group });
  }

  renderSubjects(totalRows, subjects) {
    let startIndex = -2;
    let endIndex = startIndex + 2;
    const temp = Array.from({ length: totalRows }, () => Math.floor(Math.random()));

    return (temp.map((_, i) => {
      startIndex += 2;
      endIndex += 2;
      return (
        <Row key={i}>
          {this.renderRow(startIndex, endIndex, subjects)}
        </Row>
      );
    }));
  }

  renderRow(startIndex, endIndex, subjects) {
    return subjects
      .slice(startIndex, endIndex)
      .map(e => (
        <Subject
          key={e.id}
          subject={e.name}
          group={e.group}
          inputSubject={this.inputSubject.bind(this)}
          submitBtnRef={this.state.submitBtnRef}
        />
      ));
  }

  renderAllSubjects(subjects) {
    if (subjects.length > 0) {
      if (subjects.length % 2 === 0) return this.renderSubjects(subjects.length / 2, subjects);
      return this.renderSubjects((subjects.length / 2) + 1, subjects);
    }
    return <h2>No subject available</h2>;
  }

  render() {
    const { subjects } = this.props;
    return (
      <Container>
        <h1 style={styles.headerTextStyle}>
          Please enter your first name and select the tutoring course
        </h1>
        <form style={styles.formStyle} onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <Row>
              <Col lg="4">
                <h1 style={{ fontSize: '3vw', color: '#fff', textAlign: 'center' }}>
                  Name
                </h1>
              </Col>
              <Col lg="8">
                <input
                  style={styles.inputStyle}
                  type="text"
                  onChange={e => this.setState({ ninput: e.target.value })}
                  ref={(r) => { this.ninputRef = r; }}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="12" style={{ textAlign: 'center' }}>
                <button type="button" style={styles.subjectSelectBtn} onClick={this.toggle}>Select a course</button>
              </Col>
            </Row>
            <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop="static" style={{ maxWidth: '73vw' }}>
              <ModalBody>
                <Row style={{
                  textAlign: 'center', color: '#686868', marginTop: '3.2vh', padding: '0 84px 0 84px'
                }}
                >
                  <Col lg="4">
                    <h1 style={{ fontSize: '2vw' }}>Mathematics</h1>
                    <Row>
                      <Col lg="12" style={{ height: '60vh', overflowY: 'scroll' }}>
                        {this.renderAllSubjects(this.returnSubjectGroup(subjects, 'MATH'))}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="4">
                    <h1 style={{ fontSize: '2vw' }}>STEM/CTE</h1>
                    <Row>
                      <Col lg="12" style={{ height: '60vh', overflowY: 'scroll' }}>
                        {this.renderAllSubjects(this.returnSubjectGroup(subjects, 'STEM/CTE'))}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg="4">
                    <h1 style={{ fontSize: '2vw' }}>Language Arts</h1>
                    <Row>
                      <Col lg="12" style={{ height: '60vh', overflowY: 'scroll' }}>
                        {this.renderAllSubjects(this.returnSubjectGroup(subjects, 'LA'))}
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Row style={{ width: '100%', margin: 'auto' }}>
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <button
                      type="submit"
                      ref={submitBtnRef => !this.state.submitBtnRef && this.setState({ submitBtnRef })}
                      onClick={this.onSubmit.bind(this)}
                      style={styles.submitBtn}
                    >
                      Submit
                    </button>
                    <button type="button" onClick={this.toggle} style={styles.cancelBtn}>Cancel</button>
                  </div>
                </Row>
              </ModalFooter>
            </Modal>
          </div>
        </form>
      </Container>
    );
  }
}

const styles = {
  headerTextStyle: {
    fontSize: '2.3vw',
    color: '#fff',
    textAlign: 'center',
    margin: '2vh 6vw 0 6vw'
  },

  formStyle: {
    margin: '4vh 14vw 0 14vw'
  },

  inputStyle: {
    height: '100%',
    width: '100%',
    border: 'none',
    borderBottom: '1px solid #fff',
    background: 'none'
  },

  subjectSelectBtn: {
    padding: '14px 4.3vw 14px 4.3vw',
    width: 'auto',
    background: '#fff',
    fontSize: '2vw',
    color: '#919191',
    marginTop: '4.5vh',
    borderRadius: '40px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    cursor: 'pointer'
  },

  submitBtn: {
    padding: '10px 5vw 10px 5vw',
    background: '#fff',
    fontSize: '1vw',
    color: '#919191',
    borderRadius: '40px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    marginRight: '10px',
    cursor: 'pointer'
  },

  cancelBtn: {
    padding: '10px 5vw 10px 5vw',
    background: '#DADADA',
    fontSize: '1vw',
    color: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '40px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    marginLeft: '10px',
    cursor: 'pointer'
  }
};

RequestForm.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.object).isRequired
};
