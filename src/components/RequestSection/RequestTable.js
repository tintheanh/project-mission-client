import React, { PureComponent } from 'react';
import ReactTable from 'react-table';
import FaCheck from 'react-icons/lib/fa/check';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';

export default class RequestList extends PureComponent {
  componentDidMount() {
    const { trequests, removeCheckedTrequest } = this.props;
    setInterval(() => {
      trequests.forEach((e) => {
        if (e.checked === true) {
          e.status = 'done';
          removeCheckedTrequest(e);
        }
      });
      this.forceUpdate();
    }, 120000); // Update each 5 min
  }

  getRequests(trequests, group) {
    const finalRequests = [];
    trequests.forEach((e) => {
      if (e.group === group) {
        if (e.checked === false) {
          e.status = this.getWaitingTime(e.date);
        } else e.status = this.checkBy(e.byTutor);
        finalRequests.push(e);
      }
    });
    return finalRequests;
  }


  getWaitingTime(timeRequest) {
    const diff = Math.abs(new Date() - moment(timeRequest, 'MMMM Do YYYY, h:mm:ss a'));
    const min = Math.floor((diff / 1000) / 60);
    if (min < 30) {
      if (min < 5) return 'Just now';
      if (min % 5 === 0) return `${min} min ago`;
      return `${parseInt(min / 5, 10) * 5} min ago`;
    }
    return '> 30 min ago';
  }

  checkBy(tutor) {
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
  removeCheckedTrequest: PropTypes.func.isRequired,
  trequests: PropTypes.arrayOf(PropTypes.object).isRequired
};
