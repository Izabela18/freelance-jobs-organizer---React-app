import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

import '../css/App.css';

class AddAppointments extends Component {

  constructor() {
    super();
    this.state = {
      company: '',
      job: '',
      deadline: '',
      aptTime: '',
      notes: ''

    };
    this.handleChange=this.handleChange.bind(this);
    this.handleAdd=this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    let tempApt = {
      company: this.state.company,
      job: this.state.job,
      deadline: this.state.deadline + ' ' + this.state.aptTime,
      notes: this.state.notes
    };

    this.props.addAppointment(tempApt);

    this.setState({
      company: '',
      job: '',
      deadline: '',
      aptTime: '',
      notes: ''
    });

    this.props.toggleForm();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  render () {
    return (<div
        className={
          'card textcenter mt-3 ' +
          (this.props.formDisplay ? '' : 'add-appointment')//if formDisplay is already true
        }
      >
        <div
          className="apt-addheading card-header bg-primary text-white"
          onClick={this.props.toggleForm}
        >
          <FaPlus /> Add Job
        </div>

        <div className="card-body">
          <form id="aptForm" noValidate onSubmit={this.handleAdd}>
            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="company"
                readOnly
              >
                Company
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="company"
                  placeholder="Company"
                  value={this.state.company}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="job"
              >
                Job
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="job"
                  placeholder="Job"
                  value={this.state.job}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="deadline"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="deadline"
                  id="aptDate"
                  value={this.state.deadline}
                  onChange={this.handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value={this.state.aptTime}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="notes">
                Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="notes"
                  id="aptNotes"
                  placeholder="Notes"
                  value={this.state.notes}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn btn-primary d-block ml-auto"
                >
                  Add Job
                </button>
              </div>
            </div>
          </form>
        </div>
        </div>
      );
  }
}

export default AddAppointments;
