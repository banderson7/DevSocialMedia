import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateExperience, getExperience } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
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
    this.props.getExperience(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.experience) {
      const experience = nextProps.experience;

      experience.company = !isEmpty(experience.company)
        ? experience.company
        : "";
      experience.title = !isEmpty(experience.title) ? experience.title : "";
      experience.location = !isEmpty(experience.location)
        ? experience.location
        : "";
      experience.from = !isEmpty(experience.from)
        ? experience.from.slice(0, 10)
        : "";
      experience.to = !isEmpty(experience.to) ? experience.to.slice(0, 10) : "";
      experience.current = !isEmpty(experience.current)
        ? experience.current
        : "";
      experience.description = !isEmpty(experience.description)
        ? experience.description
        : "";

      // Set component fields state
      this.setState({
        company: experience.company,
        title: experience.title,
        location: experience.location,
        from: experience.from,
        to: experience.to,
        current: experience.current,
        description: experience.description
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.updateExperience(
      this.props.match.params.id,
      expData,
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
      <div className="edit-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Experience</h1>
              <p className="lead text-center">
                Add any job or position that you have had in the past or
                currently.
              </p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
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
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={errors.description}
                  info="Tell us about the position"
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

EditExperience.propTypes = {
  updateExperience: PropTypes.func.isRequired,
  getExperience: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  experience: state.profile.experience,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateExperience, getExperience }
)(withRouter(EditExperience));
