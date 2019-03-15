import React, { Component } from 'react';


import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';

class ListAppointments extends Component {
  render () {

    return (
      <div className="list-group list-group-flush appointment-list">
      {this.props.appointments.map(item => (
          <div className="job-item list-group-item" key={item.aptId}>
            <div className="mr-3">
              <button className="pet-delete btn btn-sm btn-danger" onClick={() => this.props.deleteAppointment(item)}>
              <FaTimes />
              </button>
            </div>

            <div className="comp-info media-body">
              <div className="comp-head d-flex">
                <span className="label-item"
                  >Company:  </span>
                <span className="comp-name"
                  contentEditable="true"
                 suppressContentEditableWarning
                 onBlur={e =>
                   this.props.updateInfo(
                     'company',
                     e.target.innerText,
                     item.aptId
                   )
                 }>{item.company}</span>
                <span className="apt-date ml-auto">
                <Moment
                    date={item.deadline}
                    parse="YYYY-MM-dd hh:mm"
                    format="MMM-D h:mma"
                  />
                </span>
              </div>

              <div className="job-name">
                <span className="label-item"
                  >Job: </span>
                <span
                  contentEditable="true"
                 suppressContentEditableWarning
                 onBlur={e =>
                   this.props.updateInfo(
                     'job',
                     e.target.innerText,
                     item.aptId
                   )
                 }>{item.job}</span>
              </div>
              <span className="label-item"
                >Notes: </span>
              <span className="apt-notes"
                contentEditable="true"
                suppressContentEditableWarning
                onBlur={e =>
                  this.props.updateInfo(
                    'notes',
                    e.target.innerText,
                    item.aptId
                  )
                }>{item.notes}</span>
            </div>
          </div>
        ))}
    </div>
  );
  }
}

export default ListAppointments;
