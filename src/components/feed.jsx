import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Post from "./post";
import { fetchPosts } from "../actions/postActions";

class Feed extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const maxPosts = 20;

    return (
      <React.Fragment>
        {this.props.posts.slice(0, maxPosts).map(post => (
          <Post key={post.id} post={post} />
        ))}
      </React.Fragment>
    );
  }
}

Feed.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Feed);
