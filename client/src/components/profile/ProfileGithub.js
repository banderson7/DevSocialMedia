import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "669c91f970cb7c2e7f13",
      clientSecret: "90c4b401bf9273be1dea5ff680a94d7ab792a5f8",
      count: 5,
      sort: "updated",
      direction: "desc",
      repos: []
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count, sort, clientId, clientSecret, direction } = this.state;

    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&direction=${direction}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { repos } = this.state;

    let repoItems;
    if (repos.length > 0) {
      repoItems = repos.map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <Link to={repo.html_url} className="text-info" target="_blank">
                  {repo.name}
                </Link>
              </h4>
              <p>{repo.description}</p>
              <div className="col-md-6">
                <span className="badge badge-info mr-1">
                  Stars: {repo.stargazers_count}
                </span>
                <span className="badge badge-secondary mr-1">
                  Watchers: {repo.watchers_count}
                </span>
                <span className="badge badge-success mr-1">
                  Forks: {repo.forks_count}
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-6">
                <div className="pb-2">
                  <span>
                    <strong>Created: </strong>
                    {<Moment format="MM/DD/YYYY">{repo.created_at}</Moment>}
                  </span>
                </div>
                <div className="pb-2">
                  <span>
                    <strong>Last Update: </strong>
                    {<Moment format="MM/DD/YYYY">{repo.updated_at}</Moment>}
                  </span>
                </div>
                <div className="pb-2">
                  <span>
                    <strong>Last Push: </strong>
                    {<Moment format="MM/DD/YYYY">{repo.pushed_at}</Moment>}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    } else {
      repoItems = <p>No repos found...</p>;
    }

    const { username } = this.props;

    return (
      <div ref="myRef">
        <hr />
        <h2 className="mb-4">
          Latest GitHub Repos ({username}
          ):
        </h2>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
};

export default ProfileGithub;
