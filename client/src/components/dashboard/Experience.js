import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";
import { Link } from "react-router-dom";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
          {exp.current === true || exp.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
          )}
        </td>
        <td style={{ textAlign: "right" }}>
          <Link
            className="btn btn-secondary"
            to={`/edit-experience/${exp._id}`}
          >
            <i className="fa fa-edit fa-sm" />
          </Link>{" "}
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger"
            title="Delete this experience"
          >
            <i className="fa fa-trash-alt fa-lg" />
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>When</th>
              <th style={{ textAlign: "right" }}>Options</th>
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
