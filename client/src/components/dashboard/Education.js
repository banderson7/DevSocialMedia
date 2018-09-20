import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";
import { Link } from "react-router-dom";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldofstudy}</td>
        <td>
          <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
          {edu.current === true || edu.to === null ? (
            "Now"
          ) : (
            <Moment format="DD/MM/YYYY">{edu.to}</Moment>
          )}
        </td>
        <td style={{ textAlign: "right" }}>
          <Link className="btn btn-secondary" to={`/edit-education/${edu._id}`}>
            <i className="fa fa-edit fa-sm" />
          </Link>{" "}
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-danger"
            title="Delete this education"
          >
            <i className="fa fa-trash-alt fa-lg" />
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-2">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field</th>
              <th>When</th>
              <th style={{ textAlign: "right" }}>Options</th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
