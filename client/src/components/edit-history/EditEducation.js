import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateEducation, getEducation } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentDidMount() {
    this.props.getEducation(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.education) {
      const education = nextProps.education;

      education.school = !isEmpty(education.school) ? education.school : "";
      education.degree = !isEmpty(education.degree) ? education.degree : "";
      education.fieldofstudy = !isEmpty(education.fieldofstudy)
        ? education.fieldofstudy
        : "";
      education.from = !isEmpty(education.from)
        ? education.from.slice(0, 10)
        : "";
      education.to = !isEmpty(education.to) ? education.to.slice(0, 10) : "";
      education.current = !isEmpty(education.current) ? education.current : "";
      education.description = !isEmpty(education.description)
        ? education.description
        : "";

      // Set component fields state
      this.setState({
        school: education.school,
        degree: education.degree,
        fieldofstudy: education.fieldofstudy,
        from: education.from,
        to: education.to,
        current: education.current,
        description: education.description,
        disabled: education.current
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.updateEducation(
      this.props.match.params.id,
      eduData,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="edit-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended.
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree or Certification"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  error={errors.fieldofstudy}
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current School
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={errors.description}
                  info="Tell us about the program"
                />
                <input
                  type="submit"
                  value="Save Changes"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditEducation.propTypes = {
  updateEducation: PropTypes.func.isRequired,
  getEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  education: state.profile.education,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateEducation, getEducation }
)(withRouter(EditEducation));
