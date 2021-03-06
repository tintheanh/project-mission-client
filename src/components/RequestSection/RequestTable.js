import React, { Component } from 'react';
import ReactTable from 'react-table';
import { FaCheck } from 'react-icons/fa';
import { IoIosClose } from 'react-icons/io';
import moment from 'moment';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

class RequestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trequests: [],
      auth: false,
      currentTutorProfile: {
        group: [],
        name: '',
        tutorID: ''
      }
    };
  }

  componentDidMount() {
    // Fetch tutor's profile
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ auth: true });
        firebase.database().ref(`tutors/${user.uid}`).on('value', (snapshot) => {
          const tutorProfile = snapshot.val();
          if (tutorProfile) {
            const profile = {
              group: tutorProfile.group,
              name: tutorProfile.name,
              tutorID: tutorProfile.tutorID
            };
            this.setState({ currentTutorProfile: profile });
          }
        }).bind(this);
      } else {
        this.setState({ auth: false });
      }
    });

    // Fetch tutoring requests
    firebase.database().ref('trequests').on('value', (snapshot) => {
      const trequestObj = snapshot.val();
      const trequests = [];
      if (trequestObj) {
        Object.keys(trequestObj).forEach((e) => {
          const trequest = {
            byTutor: trequestObj[e].byTutor,
            checked: trequestObj[e].checked,
            date: trequestObj[e].date,
            dateChecked: trequestObj[e].dateChecked,
            group: trequestObj[e].group,
            name: trequestObj[e].name,
            status: '',
            subject: trequestObj[e].subject,
            id: e
          };
          trequests.push(trequest);
        });
        this.setState({ trequests });
      }
    }).bind(this);

    // Update every 1 min
    this.interval = setInterval(() => {
      this.forceUpdate();
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getWaitingStatus(trequest) {
    const diff = Math.abs(new Date() - moment(trequest.date, 'MMMM Do YYYY, h:mm:ss a'));
    const min = Math.floor((diff / 1000) / 60);
    if (trequest.checked) {
      return this.state.auth
        ? <p style={{ margin: '0', cursor: 'pointer' }} onClick={this.checkedBy.bind(this, trequest)}><FaCheck /> by {trequest.byTutor}</p>
        : <p style={{ margin: '0' }}><FaCheck /> by {trequest.byTutor}</p>;
    }

    if (min < 30) {
      if (min < 1) {
        return this.state.auth
          ? (
            <span>
              <p
                style={{
                  margin: '0', textDecoration: 'underline', cursor: 'pointer', paddingRight: '15%'
                }}
                onClick={this.checkedBy.bind(this, trequest)}
              >Just now
              </p>
              <IoIosClose
                onClick={this.removeTrequest.bind(this, trequest)}
                style={{
                  position: 'absolute', top: '30%', right: '-7px', cursor: 'pointer'
                }}
              />
            </span>
          )
          : <p style={{ margin: '0' }}>Just now</p>;
      }
      return this.state.auth
        ? (
          <span>
            <p
              style={{
                margin: '0', textDecoration: 'underline', cursor: 'pointer', paddingRight: '15%'
              }}
              onClick={this.checkedBy.bind(this, trequest)}
            >{`${min} min ago`}
            </p>
            <IoIosClose
              onClick={this.removeTrequest.bind(this, trequest)}
              style={{
                position: 'absolute', top: '30%', right: '-7px', cursor: 'pointer'
              }}
            />
          </span>
        )
        : <p style={{ margin: '0' }}>{`${min} min ago`}</p>;
    }

    return this.state.auth
      ? (
        <span>
          <p
            style={{
              margin: '0', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer', color: '#D46A6A', paddingRight: '15%'
            }}
            onClick={this.checkedBy.bind(this, trequest)}
          > > 30 min ago
          </p>
          <IoIosClose
            onClick={this.removeTrequest.bind(this, trequest)}
            style={{
              position: 'absolute', top: '30%', right: '-7px', cursor: 'pointer'
            }}
          />
        </span>
      )
      : <p style={{ margin: '0', fontWeight: 'bold', color: '#D46A6A' }}> > 30 min ago</p>;
  }

  removeTrequest(trequest) {
    // eslint-disable-next-line
    const conf = confirm('Are you sure you want to delete this request?');
    if (conf) {
      firebase.database().ref(`trequests/${trequest.id}`).remove()
        .then(() => {
          console.log('Remove succeeded');
        })
        .catch((error) => {
          console.log(`Remove failed: ${error.message}`);
        });
    } else {
      console.log('Remove canceled');
    }
  }

  filterRequests(trequests, group) {
    const filterdRequests = [];
    trequests.forEach((e) => {
      if (e.group === group) {
        e.status = this.getWaitingStatus(e);
        filterdRequests.push(e);
      }
    });
    return filterdRequests;
  }

  checkedBy(trequest) {
    if (this.state.currentTutorProfile.group.includes(trequest.group) && (trequest.byTutor === '' || trequest.byTutor === this.state.currentTutorProfile.name)) {
      const update = {
        byTutor: !trequest.checked ? this.state.currentTutorProfile.name : '',
        checked: !trequest.checked,
        dateChecked: !trequest.checked ? moment().format('MMMM Do YYYY, h:mm:ss a') : ''
      };

      firebase
        .database()
        .ref(`trequests/${trequest.id}`)
        .update(update);
    } else {
      alert('You cannot checkmark this request. It might be done by another tutor or does not belong to your tutoring group.');
    }
  }

  render() {
    const { group } = this.props;
    const filterdRequests = this.filterRequests(this.state.trequests, group);
    return (
      <div className="request-table">
        <ReactTable
          resizable={false}
          sortable={false}
          showPaginationBottom={false}
          noDataText="No requests at this time!"
          data={filterdRequests}
          columns={[
            {
              Header: 'Name',
              accessor: 'name'
            },
            {
              Header: 'Course',
              accessor: 'subject'
            },
            {
              accessor: 'status'
            }
          ]}
          defaultPageSize={13}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

RequestTable.propTypes = {
  group: PropTypes.string.isRequired
};

export default RequestTable;
