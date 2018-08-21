import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from './post';
import { fetchPosts } from '../actions/postActions';
import config from '../config';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    /* this.props.fetchPosts(); */

    const maxPosts = 20;

    fetch(`${config.apiHost}/posts`)
      .then(res => res.json())
      .then(posts => this.setState({ posts: posts.slice(0, maxPosts) }));
  }

  onDelete = id => {
    this.setState({
      posts: this.state.posts.filter(post => post.id !== id)
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.posts.map(post => (
          <Post key={post.id} post={post} onDelete={this.onDelete} />
        ))}
      </React.Fragment>
    );
  }
}

/* Feed.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default connect(
  mapStateToProps,
  { fetchPosts }
)(Feed); */

export default Feed;
