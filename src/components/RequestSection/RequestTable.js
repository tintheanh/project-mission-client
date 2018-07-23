import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import FaCheck from 'react-icons/lib/fa/check';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

export default class RequestList extends PureComponent {
  componentDidMount() {
    const { trequests } = this.props;
    setInterval(() => {
      trequests.forEach((e) => {
        if (e.checked) {
          e.status = 'done';
          // removeCheckedTrequest(e);
        }
      });
      this.forceUpdate();
    }, 60000); // Updating every 1 min
  }

  getRequests(trequests, group) {
    const finalRequests = [];
    trequests.forEach((e) => {
      if (e.group === group) {
        if (!e.checked) {
          e.status = this.getWaitingStatus(e.date);
        } else e.status = this.checkedBy(e.byTutor);
        finalRequests.push(e);
      }
    });
    return finalRequests;
  }

  getWaitingStatus(timeRequest) {
    const diff = Math.abs(new Date() - moment(timeRequest, 'MMMM Do YYYY, h:mm:ss a'));
    const min = Math.floor((diff / 1000) / 60);
    if (min < 30) {
      if (min < 5) return 'Just now';
      if (min % 5 === 0) return `${min} min ago`;
      return `${parseInt(min / 5, 10) * 5} min ago`; // If min not % 5, return the closest min % 5
    }
    return <p style={{ margin: '0', fontWeight: 'bold' }}> > 30 min ago</p>;
  }

  checkedBy(tutor) {
    return <p style={{ margin: '0' }}><FaCheck /> by {tutor}</p>;
  }

  render() {
    const { trequests, group } = this.props;
    const trequestsFinal = this.getRequests(trequests, group);
    
    return (
      <div className="request-table">
        <ReactTable
          resizable={false}
          sortable={false}
          showPaginationBottom={false}
          noDataText="No requests at this time!"
          data={trequestsFinal}
          columns={[
            {
              Header: 'Name',
              accessor: 'name'
            },
            {
              Header: 'Subject',
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

RequestList.propTypes = {
  group: PropTypes.string.isRequired,
  trequests: PropTypes.arrayOf(PropTypes.object).isRequired
};
